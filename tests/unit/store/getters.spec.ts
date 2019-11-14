import { molgenisMenu } from '@/store/getters'
import context from '../fixtures/context'
import state from '@/store/state'
import { Context } from '@/types'

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
  })
})
