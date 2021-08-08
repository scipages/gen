import { Configuration } from '../entities/Configuration'
import { Page } from '../entities/Page'
import { MenuItem } from '../entities/MenuItem'
import { BasicInfo } from '../entities/BasicInfo'
import { Course } from '../entities/Course'
import { Highlight } from '../entities/Highlight'
import { Person } from '../entities/Person'
import { Project } from '../entities/Project'
import { Publication } from '../entities/Publication'
import { Link } from '../entities/common/Link'
import { Software } from '../entities/Software'

export interface Website {
  directory: string

  configurationFilename: string
  pagesFilename: string
  menuItemsFilename: string
  basicInfoFilename: string
  coursesFilename: string
  highlightsFilename: string
  personsFilename: string
  projectsFilename: string
  publicationsFilename: string
  socialMediaFilename: string
  softwareFilename: string

  configuration: Configuration
  pages: Array<Page>
  menuItems: Array<MenuItem>
  basicInfo: BasicInfo
  courses: Array<Course>
  highlights: Array<Highlight>
  persons: Array<Person>
  projects: Array<Project>
  publications: Array<Publication>
  socialMedia: Array<Link>
  software: Software
}
