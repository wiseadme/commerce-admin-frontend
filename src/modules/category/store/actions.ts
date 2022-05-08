import { categoryRepository } from '@modules/category/repository/category.repository'
import { filesRepository } from '@shared/repository/files.repository'

export const actions = {
  async createCategory(category: ICategory){
    try {
      const { data } = await categoryRepository.create(category)
      this.state.categories.push(data.data)
      return data.data
    } catch (err) {
      return console.log(err)
    }
  },

  async updateCategory(updates){
    try {
      const { data } = await categoryRepository.update(updates)
      const ind = this.state.categories.findIndex((c) => c._id === data.data._id)
      this.state.categories.splice(ind, 1, data.data)
      return data.data
    } catch (err) {
      return console.log(err)
    }
  },

  async getCategories(id?: string){
    try {
      const { data } = await categoryRepository.read(id)
      this.state.categories = data.data
      return data.data
    } catch (err) {
      return console.log(err)
    }
  },

  async deleteCategoryImage(id, url){
    try {
      const { data } = await filesRepository.delete(id, url)
      const category = this.state.categories.find((c) => c._id === id)
      category.image = null
      return data.data
    } catch (err) {
      return console.log(err)
    }
  },

  async deleteCategory(category){
    try {
      const { data } = await categoryRepository.delete(category._id)
      this.state.categories = this.state.categories.filter(it => it._id !== category._id)
      return data
    } catch (err) {
      return console.log(err)
    }
  },

  async uploadCategoryImage(id, fileName, formData){
    try {
      const { data } = await filesRepository.create(id, fileName, formData)
      return data.data
    } catch (err) {
      return console.log(err)
    }
  }
}
