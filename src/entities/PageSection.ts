import { IEntity } from './interfaces/IEntity'
import { PublicationTypeEnum } from './Publication'

export interface IPageSection {
  title: string
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
  type: ContentPageSectionTypeEnum
  filter: ContentPageSectionFilter
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}

export interface CustomPageSection extends IEntity, IPageSection {
  id: string
  title: string
  content: string
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}
