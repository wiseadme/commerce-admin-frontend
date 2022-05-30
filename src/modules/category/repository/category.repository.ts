import { rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'

export class Repository implements IRepository {
  rest: IRest
  baseUrl: string

  constructor(rest, path){
    this.rest = rest
    this.baseUrl = path
  }

  create(category){
    return this.rest.post(this.baseUrl, category)
  }

  read(id = ''){
    return this.rest.get(this.baseUrl, { query: { id } })
  }

  update(updates){
    return this.rest.patch(this.baseUrl, updates)
  }

  delete(id){
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useCategoryRepository = () => new Repository(rest, '/v1/category')
