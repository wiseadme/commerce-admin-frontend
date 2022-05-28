import { defineStore } from 'vuezone'
import { state } from './state'
import { actions } from './actions'

export const useFilesStore = defineStore('files', {
  state,
  actions
})
