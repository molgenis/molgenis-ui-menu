export interface MenuItem {
    id: string
    label: string
    type: string
    params?: string
    items?: MenuItem[]
}

export interface MolgenisMenu {
  menu: MenuItem
  topLogo?: string
  topLogoMaxHeight?: number
  navBarLogo: string
  helpLink: {
    href: string
    label: string
  }
  authenticated: boolean
  selectedPlugin: string
  logoutFunction?: any,
  loginHref: string,
}

export interface MolgenisFooter {
  version: string
  buildDate: string
  molgenisSite: string
  pubmed1: string
  pubmed2: string
  appVersion?: string
  additionalMessage?: string
}
