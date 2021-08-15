import * as pug from 'pug'
import * as fs from 'fs'
import * as path from 'path'

import { Theme } from '../types/Theme'
import { PageData } from '../types/PageData'

export class PageGenerator {
  private readonly outDirectory: string
  private readonly theme: Theme
  private pageHtml: string

  private readonly pageData: PageData

  private warnings: Array<string>
  private errors: Array<string>

  constructor(
    outDirectory: string,
    theme: Theme,
    pageData: PageData
  ) {
    this.outDirectory = outDirectory
    this.theme = theme
    this.pageHtml = ''

    this.pageData = pageData

    this.warnings = []
    this.errors = []
  }

  public gen(): boolean {
    const compiledFunction = pug.compileFile(this.theme.indexFilename)
    this.pageHtml = compiledFunction({
      data: this.pageData
    })

    // Create the output directory
    if (!fs.existsSync(this.outDirectory)) {
      fs.mkdirSync(this.outDirectory, { recursive: true })
    }

    // Clean the output directory
    this.cleanOutDirectory(this.outDirectory)

    fs.writeFileSync(
      path.join(this.outDirectory, this.pageData.page.alias + '.html'),
      this.pageHtml,
      'utf-8'
    )

    return !this.hasErrors()
  }

  private cleanOutDirectory(directory: string): boolean {
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
