import { setContext } from '@/store/mutations'
import context from '../fixtures/context'
import { Context, ContextState } from '@/types'

describe('mutations', () => {
  describe('setContext', () => {
    it('sets the context', () => {
      const state: ContextState = {
          context: <Context> {
            authenticated: false,
            showCookieWall: true
          }
      }
      setContext(state, context)
      expect(state.context).toEqual(context)
    })
  })
})
