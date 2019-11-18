// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import languageRepository from '../../../src/repository/LanguageRepository'

describe('LanguageRepository', () => {
  describe('setSelectedLanguage', () => {
    const spy = jest.spyOn(api, 'post')
    beforeEach(async (done) => {
      await languageRepository.setSelectedLanguage('fr')
      done()
    })
    it('should use the api to set the given language code', () => {
      expect(spy).toBeCalledWith('/plugin/useraccount/language/update?languageCode=fr')
    })
  })
})
