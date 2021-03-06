import * as fs from 'fs'
import * as path from 'path'
import Ajv, { ErrorObject } from 'ajv'
import * as schema from './../schemas/themedetails-schema.json'
import { Theme } from '../types/Theme'

export class ThemeReader {
  private theme: Theme

  private warnings: Array<string>
  private errors: Array<string>

  constructor(themeDirectory: string) {
    this.theme = {
      directory: themeDirectory,
      // @ts-ignore
      details: null,
      isDetailsValid: false,
      detailsFilename: path.join(themeDirectory, 'themeDetails.json'),
      indexFilename: path.join(themeDirectory, 'pug', 'index.pug')
    }

    this.warnings = []
    this.errors = []
  }

  public read(): boolean {
    if (!fs.existsSync(this.theme.directory)) {
      this.errors.push(
        `The theme directory '${this.theme.directory}' is not valid`
      )
    }

    this.checkIfFileIsMissing(this.theme.indexFilename)
    this.checkIfFileIsMissing(this.theme.detailsFilename)

    if (!this.hasErrors()) {
      const rawdata = fs.readFileSync(this.theme.detailsFilename, 'utf-8')
      try {
        this.theme.details = JSON.parse(rawdata.toString())
      } catch (e) {
        let msg = ''
        if (e instanceof Error) {
          msg += e.message
        }
        this.errors.push(
          `Failed to read '${this.theme.detailsFilename}': ${msg}`
        )
      }
    }
    if (typeof this.theme.details !== 'object') {
      this.errors.push(
        `Failed to read '${this.theme.detailsFilename}'`
      )
    }

    const ajv = new Ajv({ allErrors: true })
    const validate = ajv.compile(schema)
    this.theme.isDetailsValid = validate(this.theme.details)
    const themeDetailsErrors: Array<string> = []
    if (!this.theme.isDetailsValid && validate.errors !== null) {
      // @ts-ignore
      validate.errors.forEach((element: ErrorObject) => {
        themeDetailsErrors.push(
          element.message ? element.message : ''
        )
      })
    }
    if (themeDetailsErrors.length > 0) {
      this.errors.push(
        `Failed to validate '${this.theme.detailsFilename}': ${themeDetailsErrors.join(', ')}`
      )
    }

    return !this.hasErrors()
  }

  private checkIfFileIsMissing(file: string): void {
    if (!fs.existsSync(file)) {
      this.errors.push(
        `The theme is missing the file '${file}'`
      )
    }
  }

  public getTheme(): Theme {
    return this.theme
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
