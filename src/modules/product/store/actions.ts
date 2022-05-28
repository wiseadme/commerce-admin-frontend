import { useProductRepository } from '@modules/product/repository'
import { useFilesRepository } from '@shared/repository/files.repository'

const productRepository = useProductRepository()
const filesRepository = useFilesRepository()

export const actions = {
  async create(product: IProductModel){
    try {
      const { data } = await productRepository.create(product)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(id?: string){
    try {
      const { data } = await productRepository.read(id)
      this.state.products = data.data
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates){
    try {
      const { data } = await productRepository.update(updates)
      console.log(data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(product: IProduct){
    try {
      const { data } = await productRepository.delete(product._id)
      this.state.products = this.state.products.filter(it => it._id !== product._id)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async deleteImage(id, url){
    try {
      const { data } = await filesRepository.delete(id, url)
      const product = this.state.products.find((c) => c._id === id)
      product.image = product.image === url ? null : product.image
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
