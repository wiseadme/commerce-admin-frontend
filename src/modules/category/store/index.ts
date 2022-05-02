import { createStore } from 'vue-v-store'

import { state } from './state'
import { actions } from './actions'

export const categoryStore = createStore({
  state,
  actions,
})
