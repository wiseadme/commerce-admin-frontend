import { useProductRepository } from '@modules/product/repository'

const productRepository = useProductRepository()

export const actions = {
  async create(product: IProductModel){
    await productRepository.create(product)
  }
}
