export enum ConfigurationThemeEnum {
  AlFolio = 'AL_FOLIO',
  MonoResearcher = 'MONO_RESEARCHER',
  // TODO:
  //  either:
  //  - Store a single 'Other/Custom' theme per website.
  //    It should be only one per website, stored under the website's directory
  //    (Maybe under /scipages-websites/website-UUID/theme/) and be included in git.
  //  or:
  //  - Use 'globally' stored 'Other/Custom' themes that each website can link to.
  //    Each website can link to one of them. They can be stored under their own directory
  //    (Maybe under /scipages-themes/theme1/, /scipages-themes/theme2/, ...)
  //    and they should not be included in git (though there could be an option
  //    later on to somehow synchronize both /scipages-configuration/ and
  //    /scipages-themes/ for a user with a remote server or using a git repo).
  //    When a linked theme for a website is not found, the user should be prompted
  //    to import it or to fall back to one of the default themes.
  Other = 'OTHER'
}

export interface Configuration {
  title: string
  theme: ConfigurationThemeEnum
  customTheme: string
  url: string // eg. 'https://scipages.github.io', 'https://www.scipages.org', 'https://scipages.org' (Used for setting absolute URLs, like the one on the 'canonical' tag)
  urlPrefix: string // eg. '/', '/~my-prefix/' (Prepended to every non-absolute URL. The path after the host)
  scssCodeInternal: string // 'global' internal CSS. Added on all pages
  scssCodeExternal: string // 'global' external CSS. Added on all pages
}
