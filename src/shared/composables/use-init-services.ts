import { useFilesService } from '@shared/services/files.service'
import { useAttributeService } from '@modules/attribute/service/attribute.service'
import { useProductService } from '@modules/product/service/product.service'
import { useCategoryService } from '@modules/category/service/category.service'

export const useInitServices = () => {

  const services = {
    files: () => useFilesService(),
    attributes: () => useAttributeService(),
    products: () => useProductService(),
    categories: () => useCategoryService()
  }

  const initService = (name) => services[name]()

  return { initService }
}
