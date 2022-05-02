import { Store } from 'vue-v-store'

export type Users = {
  url: string
  options: object
}

export interface IProductStore {
  state: IUsersState
  mutations: IUsersMutations
  actions: IUsersActions
}

export interface IUsersState {
  users: Maybe<{ url: string; options: object }>
}

export interface IUsersMutations {
  setUsers: (state: IUsersState, users: Users) => void
  setUsersUrl: (state: IUsersState, url: string) => void
}

export interface IUsersActions {
  getUsers: (context: Store<IProductStore>, payload?: any) => Promise<Users>
}
