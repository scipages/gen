export interface Favicon {
  rel: string
  href: string
  type: string
}

export interface BasicInfo {
  title: string
  subTitle: string
  bio: string
  photo: string
  email: string // It will be hardcoded into an image
  address: string
  favicon: Favicon
  og: { // https://developers.facebook.com/docs/sharing/webmasters/
    locale: string
    site_name: string
    image: string
  }
}
