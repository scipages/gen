import * as yargs from 'yargs'
import * as fs from 'fs'
import * as path from 'path'

import { ThemeReader } from './io/ThemeReader'
import { PageGenerator } from './io/PageGenerator'
import { Page } from './entities/Page'
import { BasicInfo } from './entities/BasicInfo'
import { Theme } from './types/Theme'

const args = yargs.options({
  'theme': {
    alias: 't',
    type: 'string',
    demandOption: true,
    default: './example-theme',
    describe: 'The theme directory'
  },
  'website': {
    alias: 'w',
    type: 'string',
    demandOption: true,
    default: './example-website',
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
const themeReader = new ThemeReader(args['theme'], {})

if (themeReader.read()) {
  console.error(JSON.stringify(themeReader.getErrors(), null, 2));
  process.exitCode = 1;
}



// =========================================================================
// The following should go in WebsiteReader.ts =============================
// @ts-ignore
const rawdata = fs.readFileSync(path.join(args['website'], 'pages.json'), 'utf-8')
let pages: Array<Page> = []
try {
  pages = JSON.parse(rawdata.toString()).pages
} catch (e) {
  console.log(e.message)
}
// @ts-ignore
const basicInfo: BasicInfo = JSON.parse(fs.readFileSync(path.join(args['website'], 'basicInfo.json'), 'utf-8').toString())
// =========================================================================



// if (!themeReader.hasErrors() && !websiteReader.hasErrors()) {
if (!themeReader.hasErrors()) {
  const theme: Theme = themeReader.getTheme()
  const pageGenerator = new PageGenerator(
    // @ts-ignore
    args['out'],
    theme,
    [],
    // @ts-ignore
    {
      pathOrUrl: 'my-page'
    },
    pages[0],
    basicInfo,
    [],
    [],
    [],
    [],
    [],
    []
  )

  if (!pageGenerator.gen()) {
    console.error(JSON.stringify(pageGenerator.getErrors(), null, 2));
    process.exitCode = 1;
  }
}
