import * as yargs from 'yargs'

import { ThemeReader } from './io/ThemeReader'
import { WebsiteReader } from './io/WebsiteReader'
import { PageGenerator } from './io/PageGenerator'
import { Theme } from './types/Theme'

const args = yargs.options({
  'theme': {
    alias: 't',
    type: 'string',
    demandOption: true,
    default: './test-theme',
    describe: 'The theme directory'
  },
  'website': {
    alias: 'w',
    type: 'string',
    demandOption: true,
    default: './test-website',
    describe: 'The website source directory'
  },
  'out': {
    alias: 'o',
    type: 'string',
    demandOption: true,
    default: './dist',
    describe: 'The destination directory'
  }
}).argv;


// @ts-ignore
const themeReader = new ThemeReader(args['theme'])
if (!themeReader.read()) {
  console.error(JSON.stringify(themeReader.getErrors(), null, 2));
  process.exitCode = 1;
}

// @ts-ignore
const websiteReader = new WebsiteReader(args['website'])
if (!websiteReader.read()) {
  console.error(JSON.stringify(websiteReader.getErrors(), null, 2));
  process.exitCode = 1;
}

if (!themeReader.hasErrors() && !websiteReader.hasErrors()) {
  const theme: Theme = themeReader.getTheme()
  const pageGenerator = new PageGenerator(
    // @ts-ignore
    args['out'],
    theme,
    {
      menuItems: [],
      // @ts-ignore
      activeMenuItem: {
        href: 'my-page'
      },
      page: websiteReader.getWebsiteData().pages[0],

      themeConfiguration: {},

      // @ts-ignore
      configuration: websiteReader.getWebsiteData().configuration,
      basicInfo: websiteReader.getWebsiteData().basicInfo,
      courses: [],
      highlights: [],
      persons: [],
      projects: [],
      publications: [],
      socialMedia: [],
      software: []
    }
  )

  if (!pageGenerator.gen()) {
    console.error(JSON.stringify(pageGenerator.getErrors(), null, 2));
    process.exitCode = 1;
  }
}
