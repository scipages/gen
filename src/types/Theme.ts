export interface ThemePosition {
  name: string // eg. 'menu', 'submenu', 'top', 'footer', ...
}

export interface ThemeLanguage {
  code: string // eg. 'en-GB'
  file: string // eg. 'language/en-GB/en-GB.my-custom-language-file.json'
}

export enum ThemeFieldTypeEnum {
  Text = 'TEXT',
  Number = 'NUMBER',
  Radio = 'RADIO',
  Select = 'SELECT',
  Checkbox = 'CHECKBOX'
}

export interface IThemeField {
  name: string
  type: ThemeFieldTypeEnum
  label: string
  description: string
}

export interface ThemeFieldText extends IThemeField {
  default: string
  value: string
}

export interface ThemeFieldNumber extends IThemeField {
  default: string
  value: string
}

export enum ThemeFieldCheckboxValueEnum {
  Unchecked = '0',
  Checked = '1'
}
export interface ThemeFieldCheckbox extends IThemeField {
  default: ThemeFieldCheckboxValueEnum
  value: ThemeFieldCheckboxValueEnum
}

export interface ThemeFieldSelectOption {
  value: string
  label: string
}
export interface ThemeFieldSelect extends IThemeField {
  default: string
  value: string
  options: Array<ThemeFieldSelectOption>
}
export interface ThemeFieldRadio extends IThemeField {
  default: string
  value: string
  options: Array<ThemeFieldSelectOption>
}

export interface ThemeFieldset {
  name: string  // eg. 'Main'
  fields: Array<IThemeField>
}

export interface ThemeDetails {
  name: string
  version: string // It must use semantic versioning (https://semver.org/)
  description: string
  author: string
  authorEmail: string
  authorWebsite: string
  license: string
  creationDate: string
  positions: Array<ThemePosition> // For future usage, If module positions are implemented
  languages: Array<ThemeLanguage> // For future usage, If multiple theme languages are implemented
  fieldsets: Array<ThemeFieldset>
}

export interface Theme {
  directory: string
  details: ThemeDetails
  detailsFilename: string
  isDetailsValid: boolean
  options: object
  indexFilename: string
}
