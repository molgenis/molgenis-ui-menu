import { Context, ContextState, HelpLink } from '../types'

const state: ContextState = {
  context: <Context> {
    authenticated: false,
    navBarLogo: '',
    showCookieWall: false,
    email: '',
    username: 'anonymous',
    loginHref: '',
    version: '',
    buildDate: '',
    helpLink: <HelpLink> {
      label: '',
      href: ''
    }
  }
}
export default state
