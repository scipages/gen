// import { tmpdir } from 'os'
// import { readFileSync } from 'fs'
//
// import { Theme, } from '../../../src/types/Theme'
// import { PageData } from '../../../src/types/PageData'
// import { PageGenerator } from '../../../src/io/PageGenerator'
//
// const randomNumber = Math.random()

// const testTheme: Theme = {
//   directory: '',
//   details: {
//     name: '',
//     version: '',
//     description: '',
//     author: '',
//     authorEmail: '',
//     authorWebsite: '',
//     license: '',
//     creationDate: '',
//     positions: [],
//     languages: [],
//     fieldsets: []
//   },
//   isDetailsValid: false,
//   detailsFilename: '',
//   indexFilename: ''
// }
//
// const testPageData: PageData = {
//   menuItems: [],
//   activeMenuItem: {},
//   page: {},
//
//   themeConfiguration: {},
//
//   configuration: {},
//   basicInfo: {},
//   courses: [],
//   highlights: [],
//   persons: [],
//   projects: [],
//   publications: [],
//   socialMedia: [],
//   software: []
// }

describe('ASimpleTest', () => {
  it('should just pass', function () {
    expect(true).toBe(true)
  })
  // it('should just fail', function () {
  //   expect(true).toBe(false)
  // })
})

// describe('PageGenerator', () => {
//   const outDirectory = tmpdir + '/dist'
//   let pageGenerator: PageGenerator
//   describe('gen', () => {
//     pageGenerator = new PageGenerator(outDirectory, testTheme, testPageData)
//     pageGenerator.gen()
//     it('should generate the static html file index.html', () => {
//       expect(readFileSync(outDirectory + '/index.html', { encoding: 'utf-8' })).toContain('Hello ' + randomNumber)
//     })
//   })
// })
