import { categoryRepository } from '@modules/category/repository'

export const actions = {
  async createCategory(category){
    try {
      const { data } = await categoryRepository.create(category)
      this.categories.push(data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async updateCategory(updates){
    try {
      const { data } = await categoryRepository.update(updates)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async getAllCategories(){
    try {
      const { data } = await categoryRepository.read()
      this.categories = data.data
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
