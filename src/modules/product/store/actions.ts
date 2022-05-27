import { useProductRepository } from '@modules/product/repository'

const productRepository = useProductRepository()

export const actions = {
  async create(product: IProductModel){
    try {
      const { data } = await productRepository.create(product)
      return data.data
    } catch (err) {
      return console.log(err)
    }
  },

  async read(id?: string){
    try {
      const { data } = await productRepository.read(id)
      this.state.products = data.data
      return data.data
    } catch (err) {
      return console.log(err)
    }
  },

  async delete(product: IProduct){
    try {
      const { data } = await productRepository.delete(product._id)
      this.state.products = this.state.products.filter(it => it._id !== product._id)
      return data
    } catch (err) {
      console.log(err)
    }
  }
}
