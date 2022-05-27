import { rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'

class Repository implements IRepository {
  rest: IRest
  baseUrl: string

  constructor(rest, baseUrl){
    this.rest = rest
    this.baseUrl = baseUrl
  }

  create(product){
    return rest.post(this.baseUrl, product)
  }

  read(id = ''){
    return rest.get(this.baseUrl, { query: { id } })
  }

  update(updates){
    return this.rest.patch(this.baseUrl, updates)
  }

  delete(id){
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useProductRepository = () => new Repository(rest, '/v1/product')
