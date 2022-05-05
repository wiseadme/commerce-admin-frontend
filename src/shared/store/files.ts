import { defineActions } from 'vuezone'
import { filesRepository } from '@shared/repository/files.repository'

export const useUploadsStore = () => defineActions('upload', {
  async uploadImage(fileName, formData){
    try {
      const { data } = await filesRepository.create(fileName, formData)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async deleteImage(fileName){
    try {
      const { data } = await filesRepository.delete(fileName)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
})
