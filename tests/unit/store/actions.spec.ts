// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { fetchContext } from '@/store/actions'
import context from '../fixtures/context'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))

describe('actions', () => {
  describe('fetchContext', () => {
    it('fetches the context', async () => {
      api.get.mockResolvedValue(context)
      const commit = jest.fn()
      await fetchContext({ commit })
      expect(api.get).toHaveBeenCalledWith('/app-ui-context')
      expect(commit).toHaveBeenCalledWith('setContext', context)
    })
  })
})
