import { IEntity } from './interfaces/IEntity'

export enum MenuItemTypeEnum {
  Page = 'PAGE',
  PageSection = 'PAGE_SECTION',
  External = 'External'
}

export interface MenuItem extends IEntity {
  id: string
  title: string
  href: string // 1) The URL of an 'external' link (set by the user) or 2) The relative path for a 'page' or 'section' link (set automatically)
  targetId: string
  order: number
  type: MenuItemTypeEnum
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}
