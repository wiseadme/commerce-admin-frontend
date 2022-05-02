import { createStore } from 'vue-store'
import { state, mutations, actions } from '@app/store'

const store = createStore({ state, mutations, actions })

export const useStore = () => {
  return store
}
