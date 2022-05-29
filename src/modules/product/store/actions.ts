import { useProductRepository } from '@modules/product/repository'

const productRepository = useProductRepository()

export const actions: IProductActions = {
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

      this.state.products = Array.from(this.state.products, (pr: IProduct) => {
        if (pr._id === updates._id) return data.data
        return pr
      })

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
  }
}
