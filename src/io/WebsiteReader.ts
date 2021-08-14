import * as fs from 'fs'
import * as path from 'path'
import { WebsiteData } from '../types/WebsiteData'
import { PageData } from '../types/PageData'

export class WebsiteReader {
  private websiteData: WebsiteData

  private warnings: Array<string>
  private errors: Array<string>

  constructor(websiteDirectory: string) {
    this.websiteData = {
      directory: websiteDirectory,

      themeConfigurationFilename: path.join(websiteDirectory, 'themeConfiguration.json'),
      configurationFilename: path.join(websiteDirectory, 'configuration.json'),
      pagesFilename: path.join(websiteDirectory, 'pages.json'),
      menuItemsFilename: path.join(websiteDirectory, 'menuItems.json'),
      basicInfoFilename: path.join(websiteDirectory, 'basicInfo.json'),
      coursesFilename: path.join(websiteDirectory, 'courses.json'),
      highlightsFilename: path.join(websiteDirectory, 'highlights.json'),
      personsFilename: path.join(websiteDirectory, 'persons.json'),
      projectsFilename: path.join(websiteDirectory, 'projects.json'),
      publicationsFilename: path.join(websiteDirectory, 'publications.json'),
      socialMediaFilename: path.join(websiteDirectory, 'socialMedia.json'),
      softwareFilename: path.join(websiteDirectory, 'software.json'),

      themeConfiguration: {},
      // @ts-ignore
      configuration: null,
      pages: [],
      menuItems: [],
      // @ts-ignore
      basicInfo: null,
      courses: [],
      highlights: [],
      persons: [],
      projects: [],
      publications: [],
      socialMedia: [],
      software: []
    }

    this.warnings = []
    this.errors = []
  }

  read(): boolean {
    if (!fs.existsSync(this.websiteData.directory)) {
      this.errors.push(
        `The website directory '${this.websiteData.directory}' is not valid`
      )
    }

    this.checkIfFileIsMissing(this.websiteData.themeConfigurationFilename)
    this.checkIfFileIsMissing(this.websiteData.configurationFilename)
    this.checkIfFileIsMissing(this.websiteData.pagesFilename)
    this.checkIfFileIsMissing(this.websiteData.menuItemsFilename)
    this.checkIfFileIsMissing(this.websiteData.basicInfoFilename)
    this.checkIfFileIsMissing(this.websiteData.coursesFilename)
    this.checkIfFileIsMissing(this.websiteData.highlightsFilename)
    this.checkIfFileIsMissing(this.websiteData.personsFilename)
    this.checkIfFileIsMissing(this.websiteData.projectsFilename)
    this.checkIfFileIsMissing(this.websiteData.publicationsFilename)
    this.checkIfFileIsMissing(this.websiteData.socialMediaFilename)
    this.checkIfFileIsMissing(this.websiteData.softwareFilename)

    if (this.hasErrors()) {
      return false
    }

    this.readFile(this.websiteData.themeConfigurationFilename, 'themeConfiguration', '')
    this.readFile(this.websiteData.configurationFilename, 'configuration', '')
    this.readFile(this.websiteData.pagesFilename, 'pages', 'pages')
    this.readFile(this.websiteData.menuItemsFilename, 'menuItems', 'menuItems')
    this.readFile(this.websiteData.basicInfoFilename, 'basicInfo', '')
    this.readFile(this.websiteData.coursesFilename, 'courses', 'courses')
    this.readFile(this.websiteData.highlightsFilename, 'highlights', 'highlights')
    this.readFile(this.websiteData.personsFilename, 'persons', 'persons')
    this.readFile(this.websiteData.projectsFilename, 'projects', 'projects')
    this.readFile(this.websiteData.publicationsFilename, 'publications', 'publications')
    this.readFile(this.websiteData.socialMediaFilename, 'socialMedia', 'socialMedia')
    this.readFile(this.websiteData.softwareFilename, 'software', 'software')

    if (this.hasErrors()) {
      return false
    }

    this.websiteData.configuration.url = this.getFixedUrl(
      this.websiteData.configuration.url
    )
    this.websiteData.configuration.urlPrefix = this.getFixedUrlPrefix(
      this.websiteData.configuration.urlPrefix
    )

    return !this.hasErrors()
  }

  checkIfFileIsMissing(file: string): void {
    if (!fs.existsSync(file)) {
      this.errors.push(
        `The website is missing the file '${file}'`
      )
    }
  }

  readFile(file: string, websiteDataProperty: string, fileJsonProperty = ''): void {
    if (!Object.prototype.hasOwnProperty.call(this.websiteData, websiteDataProperty)) {
      this.errors.push(
        `Failed to read the file '${file}':  Unrecognized property ${websiteDataProperty}`
      )
      return
    }
    let jsonObject = null
    try {
      jsonObject = JSON.parse(
        fs.readFileSync(file, 'utf-8').toString()
      )
    } catch (e) {
      this.errors.push(
        `Failed to read the file '${file}':  ${e.message}`
      )
      return
    }
    if (jsonObject === null) {
      this.errors.push(
        `Failed to read the file '${file}'`
      )
      return
    }
    if (
      fileJsonProperty !== '' &&
      !Object.prototype.hasOwnProperty.call(jsonObject, fileJsonProperty)
    ) {
      this.errors.push(
        `Failed to read the file '${file}':  Missing property '${fileJsonProperty}'`
      )
      return
    }

    // @ts-ignore
    this.websiteData[websiteDataProperty] = fileJsonProperty === '' ?
      jsonObject :
      jsonObject[fileJsonProperty]
  }

  getFixedUrl(url: string): string {
    if (url === '') {
      return url
    }
    let urlObj
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      urlObj = new URL(url);
    } catch (e) {
      this.errors.push(
        `The URL is not valid: '${url}'`
      )
    }
    if (url.slice(-1) === '/') {
      return url.slice(0, -1)
    }
    return url
  }

  getFixedUrlPrefix(urlPrefix: string): string {
    if (urlPrefix === '') {
      return '/'
    }
    let newUrlPrefix = ''
    if (urlPrefix.slice(-1) !== '/') {
      newUrlPrefix = urlPrefix + '/'
    }
    if (newUrlPrefix.slice(0, 1) !== '/') {
      newUrlPrefix = '/' + newUrlPrefix
    }
    return newUrlPrefix
  }

  /**
   * Returns a list of PageData objects
   */
  getAllPageData(): Array<PageData> {
    if (this.hasErrors()) {
      return []
    }

    // TODO: ...

    return []
  }

  // get...(): ... {
  //   return this....
  // }

  getWebsiteData(): WebsiteData {
    return this.websiteData
  }

  hasWarnings(): boolean {
    return this.warnings.length !== 0
  }

  hasErrors(): boolean {
    return this.errors.length !== 0
  }

  getWarnings(): Array<string> {
    return this.warnings
  }

  getErrors(): Array<string> {
    return this.errors
  }
}
