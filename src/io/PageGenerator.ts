import * as pug from 'pug'
import * as fs from 'fs'
import * as path from 'path'

import { MenuItem } from '../entities/MenuItem'
import { Page } from '../entities/Page'

import { BasicInfo } from '../entities/BasicInfo'

import { Course } from '../entities/Course'
import { Highlight } from '../entities/Highlight'
import { Person } from '../entities/Person'
import { Project } from '../entities/Project'
import { Publication } from '../entities/Publication'
import { Software } from '../entities/Software'
import { Theme } from '../types/Theme'

export class PageGenerator {
  private readonly outDirectory: string
  private readonly theme: Theme
  private pageHtml: string

  private readonly menuItems: Array<MenuItem>
  private readonly activeMenuItem: MenuItem
  private readonly page: Page
  private readonly basicInfo: BasicInfo
  private readonly courses: Array<Course>
  private readonly highlights: Array<Highlight>
  private readonly persons: Array<Person>
  private readonly projects: Array<Project>
  private readonly publications: Array<Publication>
  private readonly software: Array<Software>

  private warnings: Array<string>
  private errors: Array<string>

  constructor(
    outDirectory: string,
    theme: Theme,
    menuItems: Array<MenuItem>,
    activeMenuItem: MenuItem,
    page: Page,
    basicInfo: BasicInfo,
    courses: Array<Course>,
    highlights: Array<Highlight>,
    persons: Array<Person>,
    projects: Array<Project>,
    publications: Array<Publication>,
    software: Array<Software>
  ) {
    this.outDirectory = outDirectory
    this.theme = theme
    this.pageHtml = ''

    this.menuItems = menuItems
    this.activeMenuItem = activeMenuItem
    this.page = page
    this.basicInfo = basicInfo
    this.courses = courses
    this.highlights = highlights
    this.persons = persons
    this.projects = projects
    this.publications = publications
    this.software = software

    this.warnings = []
    this.errors = []
  }

  gen(): boolean {
    const compiledFunction = pug.compileFile(this.theme.indexFilename)
    this.pageHtml = compiledFunction({
      menuItems: this.menuItems,
      activeMenuItem: this.activeMenuItem,
      page: this.page,
      basicInfo: this.basicInfo,
      courses: this.courses,
      highlights: this.highlights,
      persons: this.persons,
      projects: this.projects,
      publications: this.publications,
      software: this.software
    })

    // Create the output directory
    if (!fs.existsSync(this.outDirectory)) {
      fs.mkdirSync(this.outDirectory, { recursive: true })
    }

    // Clean the output directory
    this.cleanOutDirectory(this.outDirectory)

    fs.writeFileSync(
      path.join(this.outDirectory, this.activeMenuItem.pathOrUrl + '.html'),
      this.pageHtml,
      'utf-8'
    )

    return !this.hasErrors()
  }

  cleanOutDirectory(directory: string): boolean {
    if (fs.existsSync(directory) && fs.lstatSync(directory).isDirectory()) {
      fs.readdirSync(directory).forEach(file => {
        const curPath = path.join(directory, file)

        if (fs.lstatSync(curPath).isDirectory()) {
          this.cleanOutDirectory(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      if (directory !== this.outDirectory) {
        fs.rmdirSync(directory)
      }
    }
    return true
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
