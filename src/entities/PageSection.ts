import { IEntity } from './interfaces/IEntity'
import { PublicationTypeEnum } from './Publication'

export interface IPageSection {
  id: string
  title: string
  alias: string // The 'id' attribute of the page section's wrapping HTML element. Used on links to the page section. Unique, alphanumeric, no spaces, no special characters except dashes (-)
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}

export enum ContentPageSectionTypeEnum {
  BasicInfo = 'BASIC_INFO',
  Publications = 'PUBLICATIONS',
  Projects = 'PROJECTS',
  News = 'NEWS',
  People = 'PEOPLE',
  Teaching = 'TEACHING',
  Software = 'SOFTWARE',
  SocialMedia = 'SOCIAL_MEDIA'
}

export interface ContentPageSectionFilter {
  id: string
  sortBy?: string
  groupBy?: string
  dateCreated: Date
  dateUpdated: Date
}

export interface ContentPageSectionFilterPublications extends ContentPageSectionFilter {
  types?: Array<PublicationTypeEnum>
  years?: Array<number>
  authors?: Array<string>
  inLab?: boolean
}

export interface ContentPageSection extends IEntity, IPageSection {
  id: string
  title: string
  alias: string
  type: ContentPageSectionTypeEnum
  filter: ContentPageSectionFilter
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}

export interface CustomPageSection extends IEntity, IPageSection {
  id: string
  title: string
  alias: string
  content: string
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}
