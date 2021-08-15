import * as fs from 'fs'
import * as path from 'path'
import { WebsiteData } from '../types/WebsiteData'
import { PageData } from '../types/PageData'
import { Page, PageTypeEnum } from '../entities/Page'
import { MenuItem, MenuItemTypeEnum } from '../entities/MenuItem'
import { IPageSection } from '../entities/PageSection'

export class WebsiteReader {
  private websiteData: WebsiteData

  private enabledPageIds: Array<string>
  private enabledPages: Record<string, Page>
  private enabledPagesPerPageSectionId: Record<string, Page>
  private enabledPageSectionIds: Array<string>
  private enabledPageSections: Record<string, IPageSection>
  // private enabledPageSectionsPerPage: Record<string, Record<string, IPageSection>>
  private enabledMenuItemIds: Array<string>
  private enabledMenuItems: Array<MenuItem>

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

    this.enabledPageIds = []
    this.enabledPages = {}
    this.enabledPagesPerPageSectionId = {}
    this.enabledPageSectionIds = []
    this.enabledPageSections = {}
    // this.enabledPageSectionsPerPage = {}
    this.enabledMenuItemIds = []
    this.enabledMenuItems = []

    this.warnings = []
    this.errors = []
  }

  public read(): boolean {
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

    // The following must be set after 'url' and 'urlPrefix' are fixed
    this.setCanonicalUrls()
    this.setEnabledPagesAndSections()
    this.setEnabledMenuItems()

    return !this.hasErrors()
  }

  private checkIfFileIsMissing(file: string): void {
    if (!fs.existsSync(file)) {
      this.errors.push(
        `The website is missing the file '${file}'`
      )
    }
  }

  private readFile(file: string, websiteDataProperty: string, fileJsonProperty = ''): void {
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

  private getFixedUrl(url: string): string {
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

  private getFixedUrlPrefix(urlPrefix: string): string {
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
   * Set the canonical URLs of the pages
   */
  private setCanonicalUrls(): void {
    for (let i = 0; i < this.websiteData.pages.length; i++) {
      const page: Page = this.websiteData.pages[i]
      this.websiteData.pages[i].meta.canonical =
        this.websiteData.configuration.url +
        this.websiteData.configuration.urlPrefix
      if (page.type !== PageTypeEnum.Home) {
        this.websiteData.pages[i].meta.canonical += page.alias + '.html'
      }
    }
  }

  private setEnabledPagesAndSections(): void {
    for (let i = 0; i < this.websiteData.pages.length; i++) {
      const page: Page = this.websiteData.pages[i]
      if (!page.enabled) {
        continue
      }
      this.enabledPageIds.push(page.id)
      this.enabledPages[page.id] = page
      // this.enabledPageSectionsPerPage[page.id] = {}
      for (let j = 0; j < page.sections.length; j++) {
        const pageSection: IPageSection = page.sections[i]
        if (!pageSection.enabled) {
          continue
        }
        this.enabledPageSectionIds.push(pageSection.id)
        this.enabledPageSections[pageSection.id] = pageSection
        this.enabledPagesPerPageSectionId[pageSection.id] = page
        // this.enabledPageSectionsPerPage[page.id][pageSection.id] = pageSection
      }
    }
  }

  private setEnabledMenuItems(): void {
    this.websiteData.menuItems.sort(
      (a, b) => {
        return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)
      }
    )

    for (let i = 0; i < this.websiteData.menuItems.length; i++) {
      const menuItem: MenuItem = this.websiteData.menuItems[i]
      if (!menuItem.enabled) {
        continue
      }
      if (
        menuItem.type === MenuItemTypeEnum.Page &&
        !this.enabledPageIds.includes(menuItem.targetId)
      ) {
        this.warnings.push(
          `The page '${menuItem.targetId}' is not enabled`
        )
        continue
      }
      if (
        menuItem.type === MenuItemTypeEnum.PageSection &&
        !this.enabledPageSectionIds.includes(menuItem.targetId)
      ) {
        this.warnings.push(
          `The page section '${menuItem.targetId}' is not enabled`
        )
        continue
      }

      if (menuItem.type === MenuItemTypeEnum.Page) {
        menuItem.href = this.websiteData.configuration.urlPrefix +
          this.enabledPages[menuItem.targetId].alias + '.html'
      } else if (menuItem.type === MenuItemTypeEnum.PageSection) {
        menuItem.href = this.websiteData.configuration.urlPrefix +
          this.enabledPagesPerPageSectionId[menuItem.targetId].alias + '.html#'
          this.enabledPageSections[menuItem.targetId].alias
      }

      this.enabledMenuItemIds.push(menuItem.id)
      this.enabledMenuItems.push(menuItem)
    }
  }

  // public getPageById(): Page {
  //
  // }

  /**
   * Returns a list of PageData objects
   */
  public getAllPageData(): Array<PageData> {
    if (this.hasErrors()) {
      return []
    }

    // TODO: ...

    return []
  }

  // public get...(): ... {
  //   return this....
  // }

  public getWebsiteData(): WebsiteData {
    return this.websiteData
  }

  public hasWarnings(): boolean {
    return this.warnings.length !== 0
  }

  public hasErrors(): boolean {
    return this.errors.length !== 0
  }

  public getWarnings(): Array<string> {
    return this.warnings
  }

  public getErrors(): Array<string> {
    return this.errors
  }
}
