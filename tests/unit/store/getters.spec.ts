import { molgenisMenu, molgenisFooter } from '@/store/getters'
import context from '../fixtures/context'
import state from '@/store/state'
import { Context, ContextState, MolgenisMenu } from '@/types'

describe('getters', () => {
  describe('molgenisMenu', () => {
    it('maps null context to null', () => {
      const actual = molgenisMenu(state)
      expect(actual).toBeNull()
    })

    it('maps context with null menu to null', () => {
      const param: Context = {...context}
      delete param['menu']
      const actual = molgenisMenu({ context: param})
      expect(actual).toBeNull()
    })

    it('maps context', () => {
      const actual = molgenisMenu({context})
      expect(actual).toEqual({
        authenticated: false,
        helpLink: {
          href: "https://molgenis.gitbooks.io/molgenis/content/", 
          label: "Help"
        },
        loginHref: "/login",
        menu: context.menu,
        navBarLogo: "/img/Logo_Blue_Small.png",
        topLogoMaxHeight: 150
      })
    })

    it('can maps logoTop from context', () => {
      const actual = molgenisMenu({context: {...context, logoTop: 'https://example.org/logotop.jpg'}})
      expect(actual && actual.topLogo).toEqual('https://example.org/logotop.jpg')
    })
  })

  describe('molgenisFooter', () => {
    it('maps null context to null', () => {
      const actual = molgenisFooter(state)
      expect(actual).toBeNull()
    })

    it('maps context', () => {
      const actual = molgenisFooter({context})
      expect(actual).toEqual({
        additionalMessage: "Footerdefooter",
        buildDate: "2019-11-07 15:05 UTC",
        "molgenisSite": "https://www.molgenis.org",
        "version": "8.3.0-SNAPSHOT"
      })
    })

    it('adds app version from state', () => {
      const appVersion = '1.2.3'
      const actual = molgenisFooter({context, appVersion})
      expect(actual && actual.appVersion).toEqual(appVersion)
    })

    it('can handle missing additional message in context', () => {
      const contextCopy: Context = {...context}
      delete contextCopy.additionalMessage
      const actual = molgenisFooter({context: contextCopy})
      expect(actual!=null && actual.hasOwnProperty('additionalMessage')).toBeFalsy()
    })
  })
})
