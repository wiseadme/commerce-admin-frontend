import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { createStore } from 'vue-v-store'

// import { IProductStore } from '@modules/product/@types/store'

const productStore = createStore({
  state,
  mutations,
  actions
})

export const useProductStore = () => productStore
