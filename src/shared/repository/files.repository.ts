import { fileApi } from '@shared/plugins/axios'
import { IRest, IRepository } from '@shared/types/app'

class Repository implements IRepository {
  private rest: IRest

  constructor(rest) {
    this.rest = rest
  }

  create(fileName, formData) {
    return this.rest.post(`/v1/assets?fileName=${fileName}`, formData)
  }
}

export const filesRepository = new Repository(fileApi)
