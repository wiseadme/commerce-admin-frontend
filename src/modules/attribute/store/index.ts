import { defineStore } from 'vuezone'
import { actions } from '@/modules/attribute/store/actions'
import { state } from '@/modules/attribute/store/state'

export const useAttributeStore = defineStore<IAttributeState, IAttributesActions>('attribute', {
  state,
  actions
})
