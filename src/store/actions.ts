// @ts-ignore
import api from '@molgenis/molgenis-api-client'

export const fetchContext = async ({commit}: any) => {
  const response = await api.get('/app-ui-context')
  commit('setContext', response)
}

export default {
  fetchContext
}