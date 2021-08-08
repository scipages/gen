import { IEntity } from './interfaces/IEntity'

export enum MenuItemTypeEnum {
  Page = 'PAGE',
  PageSection = 'PAGE_SECTION',
  External = 'External'
}

export interface MenuItem extends IEntity {
  id: string
  title: string
  pathOrUrl: string
  targetId: string
  order: number
  type: MenuItemTypeEnum
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}
