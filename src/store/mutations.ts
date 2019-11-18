import { ContextState, Context } from '../types'

export const setContext = (state: ContextState, context: Context) => {
  state.context = context
}

export default {
  setContext
}
