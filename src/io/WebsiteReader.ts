// import * as fs from 'fs'
// import * as path from 'path'
// import Ajv, { ErrorObject } from 'ajv'
// import * as schema from './../schemas/themedetails-schema.json'
// import { Theme } from '../types/Theme'
//
// export class ThemeReader {
//   private website: Theme
//
//   private warnings: Array<string>
//   private errors: Array<string>
//
//   constructor(websiteDirectory: string, themeOptions: object) {
//     this.theme = {
//       directory: themeDirectory,
//       // @ts-ignore
//       details: null,
//       detailsFilename: path.join(themeDirectory, 'themeDetails.json'),
//       isDetailsValid: false,
//       options: themeOptions,
//       indexFilename: path.join(themeDirectory, 'pug', 'index.pug')
//     }
//
//     this.warnings = []
//     this.errors = []
//   }
//
//   read(): boolean {
//     // ...
//
//     return !this.hasErrors()
//   }
//
//   // get...(): ... {
//   //   return this....
//   // }
//
//   hasWarnings(): boolean {
//     return this.warnings.length !== 0
//   }
//
//   hasErrors(): boolean {
//     return this.errors.length !== 0
//   }
//
//   getWarnings(): Array<string> {
//     return this.warnings
//   }
//
//   getErrors(): Array<string> {
//     return this.errors
//   }
// }
