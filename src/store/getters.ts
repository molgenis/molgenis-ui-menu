import { ContextState, MolgenisMenu, MolgenisFooter } from '../types'

export const molgenisMenu = (state: ContextState): MolgenisMenu | null => {
  const context = state.context
  if (!context || !context.menu) {
    return null
  }
  const result: MolgenisMenu = {
    menu: context.menu,
    helpLink: context.helpLink,
    authenticated: context.authenticated,
    selectedPlugin: state.selectedPlugin,
    loginHref: context.loginHref
  }
  // map optional keys
  if (context.logoTop) {
    result.topLogo = context.logoTop
  }
  if (context.navBarLogo) {
    result.navBarLogo = context.navBarLogo
  }
  if (context.logoTopMaxHeight) {
    result.topLogoMaxHeight = context.logoTopMaxHeight
  }
  return result
}

export const molgenisFooter = (state: ContextState): MolgenisFooter | null => {
  const context = state.context
  if (!context) {
    return null
  }
  const result: MolgenisFooter = {
    ...context,
    molgenisSite: 'https://www.molgenis.org'
  }
  return result
}

export default {
  molgenisMenu,
  molgenisFooter
}
