import { setContext } from '@/store/mutations'
import context from '../fixtures/context'
import { ContextState } from '@/types'

describe('mutations', () => {
  describe('setContext', () => {
    it('sets the context', () => {
      const state: ContextState = {context: null}
      setContext(state, context)
      expect(state.context).toEqual(context)
    })
  })
})
