import { useProductStore } from '../store'

export const productService = () => {
  const $store = useProductStore()

  const fetchAllUsers = () => {
    return $store.dispatch('getUsers')
  }

  const setNewUrl = (url) => {
    $store.commit('setUsersUrl', url)
  }

  return {
    fetchAllUsers,
    setNewUrl,
  }
}
