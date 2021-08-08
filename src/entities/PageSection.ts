import { IEntity } from './interfaces/IEntity'

export interface IPageSection {
  title: string
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}

export enum ContentPageSectionTypeEnum {
  Publications = 'PUBLICATIONS',
  Projects = 'PROJECTS',
  News = 'NEWS',
  People = 'PEOPLE',
  Teaching = 'TEACHING',
  Software = 'SOFTWARE',
  SocialMedia = 'SOCIAL_MEDIA'
}

export interface ContentPageSection extends IEntity, IPageSection {
  id: string
  title: string
  type: ContentPageSectionTypeEnum
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
