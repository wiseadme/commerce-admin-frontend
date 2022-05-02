import { categoryRepository } from '@modules/category/repository'

export const actions = {
  async createCategory({ state }, category){
    try {
      const { data } = await categoryRepository.create(category)
      state.categories.push(data)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  getAllCategories(){

  }
}
