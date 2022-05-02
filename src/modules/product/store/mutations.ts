import { IUsersMutations } from '../types/store'

export const mutations: IUsersMutations = {
  setUsers(state, users) {
    state.users = users
  },

  setUsersUrl(state, url) {
    state.users!.url = url
  },
}
