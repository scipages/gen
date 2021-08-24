import * as path from 'path'

import { Theme } from '../../../src/types/Theme'
import { ThemeReader } from '../../../src/io/ThemeReader'

describe('ThemeReader', () => {
  const themeDirectory = path.join(__dirname, '..', '..', '..', 'test-theme')
  let themeReader: ThemeReader
  describe('read', () => {
    themeReader = new ThemeReader(themeDirectory)
    themeReader.read()
    it('should produce a valid Theme object', () => {
      const theme: Theme = themeReader.getTheme()
      expect(theme.directory).toBe(themeDirectory)
      expect(theme.isDetailsValid).toBe(true)
    })
    it('should have no errors', () => {
      expect(themeReader.hasErrors()).toBe(false)
      expect(themeReader.getErrors()).toEqual([])
    })
    it('may have warnings', () => {
      expect(typeof themeReader.hasWarnings()).toBe('boolean')
      expect(Array.isArray(themeReader.getWarnings())).toBe(true)
    })
  })
})
