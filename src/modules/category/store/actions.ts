import { useCategoryRepository } from '@modules/category/repository/category.repository'
import { useFilesRepository } from '@shared/repository/files.repository'

const categoryRepository = useCategoryRepository()
const filesRepository = useFilesRepository()

export const actions = {
  async create(category: ICategory){
    try {
      const { data } = await categoryRepository.create(category)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates){
    try {
      const { data } = await categoryRepository.update(updates)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(id?: string){
    try {
      const { data } = await categoryRepository.read(id)
      !id && (this.state.categories = data.data)
      id && (this.state.category = data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(category){
    try {
      const { data } = await categoryRepository.delete(category._id)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async deleteImage(id, url){
    try {
      const { data } = await filesRepository.delete(id, url)
      const category = this.state.categories.find((c) => c._id === id)
      category.image = null
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async uploadImage(id, fileName, formData){
    try {
      const { data } = await filesRepository.create(id, fileName, formData)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
