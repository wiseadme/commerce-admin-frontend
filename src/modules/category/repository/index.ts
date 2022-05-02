import { rest } from '@shared/plugins/axios'
import { IRest, IRepository } from '@shared/types/app'

export class Repository implements IRepository {
  rest: IRest

  constructor(rest){
    this.rest = rest
  }

  async create(category){
    return await this.rest.post('/v1/category', category)
  }
}

export const categoryRepository = new Repository(rest)
