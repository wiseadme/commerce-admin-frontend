import { defineStore } from 'vuezone'
import { filesRepository } from '@shared/repository/files.repository'

export const useUploadsStore = defineStore('upload', {
  state: () => {},
  actions: {
    async uploadImage(fileName, formData) {
      try {
        const { data } = await filesRepository.create(fileName, formData)
        return data.data
      } catch (err) {
        return Promise.reject(err)
      }
    },
  },
})
