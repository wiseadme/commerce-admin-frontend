import { fileApi } from '@shared/plugins/axios'
import { IRest, IRepository } from '@shared/types/app'

interface FilesRepository extends Omit<IRepository, 'read' | 'update'> {
  create: (fileName: string, formData: FormData) => Promise<{ data: { data: any } }>
  delete: (fileName: string) => Promise<{ data: { data: boolean } }>
}

class Repository implements FilesRepository {
  private rest: IRest

  constructor(rest){
    this.rest = rest
  }

  create(fileName, formData){
    return this.rest.post(`/v1/assets?fileName=${ fileName }`, formData)
  }

  delete(fileName){
    return this.rest.delete(`/v1/assets/${ fileName }`)
  }
}

export const filesRepository: FilesRepository = new Repository(fileApi)
