import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

class Repository implements IRepository {
  rest: IRest
  baseUrl: string

  constructor(rest, baseUrl){
    this.rest = rest
    this.baseUrl = baseUrl
  }

  create(attribute){
    return this.rest.post(this.baseUrl, attribute)
  }

  read(id = ''){
    return this.rest.get(this.baseUrl, { query: { id } })
  }

  update(updates): Promise<{ data: { data: Array<IAttribute> } }>{
    return this.rest.patch(this.baseUrl, updates)
  }

  delete(id){
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useAttributeRepository = () => new Repository(rest, '/v1/attribute')
