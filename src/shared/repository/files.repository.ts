import { fileApi } from '@shared/plugins/axios'
import { IRest, IRepository } from '@shared/types/app'

interface FilesRepository extends Omit<IRepository, 'read' | 'update'> {
  create: (id: string, fileName: string, formData: FormData) => Promise<{ data: { data: any } }>
  delete: (id: string, fileName: string) => Promise<{ data: { data: boolean } }>
}

class Repository implements FilesRepository {
  private rest: IRest

  constructor(rest){
    this.rest = rest
  }

  create(id, fileName, formData){
    return this.rest.post(`/v1/assets?id=${ id }&&fileName=${ fileName }`, formData)
  }

  delete(id, url){
    return this.rest.delete(`/v1/assets/${ id }/${ url }`)
  }
}

export const filesRepository: FilesRepository = new Repository(fileApi)
