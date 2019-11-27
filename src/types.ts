export interface MenuNode {
  id: string
  label: string
  type?: 'menu' | 'plugin'
}

export interface MenuItem extends MenuNode{
  params?: string
}

export interface Menu extends MenuNode {
  items: (Menu | MenuItem)[]
}

export interface MolgenisMenu {
  menu: Menu
  topLogo?: string
  topLogoMaxHeight?: number
  navBarLogo?: string
  helpLink: HelpLink
  authenticated: boolean
  selectedPlugin?: string
  logoutFunction?: any,
  loginHref: string,
}

export interface MolgenisFooter {
  version: string
  buildDate: string
  molgenisSite: string
  appVersion?: string
  additionalMessage?: string
}

export interface HelpLink {
  label: string
  href: string
}

export interface Context {
  email: string,
  username: string,
  logoTop?: string
  logoTopMaxHeight: number
  navBarLogo?: string
  menu?: Menu
  loginHref: string
  helpLink: HelpLink
  authenticated: boolean
  showCookieWall: boolean
  additionalMessage?: string
  version: string
  buildDate: string
  cssHref?: string
}

export interface ContextState {
  context: Context
  selectedPlugin?: string
  appVersion?: string
}
