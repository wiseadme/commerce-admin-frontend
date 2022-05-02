import { api } from '../api'
import { IUsersActions, Users } from '@modules/product/types/store'

export const actions: IUsersActions = {
  async getUsers({ commit }): Promise<Users> {
    try {
      const data = (await api.getUsers()) as Users
      commit('setUsers', data)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },
}
