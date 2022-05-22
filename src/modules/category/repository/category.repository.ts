import { rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'

export class Repository implements IRepository {
  rest: IRest
  baseUrl: string

  constructor(rest, path){
    this.rest = rest
    this.baseUrl = path
  }

  async create(category){
    return this.rest.post(this.baseUrl, category)
  }

  async read(id = ''){
    return this.rest.get(this.baseUrl, { query: { id } })
  }

  async update(updates){
    return this.rest.patch(this.baseUrl, updates)
  }

  async delete(id){
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const categoryRepository = new Repository(rest, '/v1/category')
