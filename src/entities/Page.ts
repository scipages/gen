import { IEntity } from './interfaces/IEntity'
import { IPageSection } from './PageSection'

export enum PageTypeEnum {
  Home = 'HOME',
  Other = 'OTHER'
}

export interface Page extends IEntity {
  id: string
  title: string
  type: PageTypeEnum
  meta: {
    description: string
    keywords: string
    author: string
  }
  sections: Array<IPageSection>
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}
