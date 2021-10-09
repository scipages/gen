import { IEntity } from './interfaces/IEntity'
import { IPageSection } from './PageSection'

export enum PageTypeEnum {
  Home = 'HOME',
  Other = 'OTHER'
}

export enum PageMetaRobotsEnum {
  IndexFollow = 'index, follow',
  NoIndexFollow = 'noindex, follow',
  IndexNoFollow = 'index, nofollow',
  NoIndexNoFollow = 'noindex, nofollow'
}

export interface Page extends IEntity {
  id: string
  title: string
  alias: string // The 'filename' of the page. Used on links to the page. Empty ('') for 'HOME' page type. Unique, alphanumeric, no spaces, no special characters except dashes (-)
  type: PageTypeEnum
  meta: {
    description: string
    keywords: string
    author: string
    canonical: string // Generated automatically
    robots: PageMetaRobotsEnum // https://developers.google.com/search/docs/advanced/robots/robots_meta_tag
  }
  scssCodeInternal: string
  scssCodeExternal: string
  sections: Array<IPageSection>
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}
