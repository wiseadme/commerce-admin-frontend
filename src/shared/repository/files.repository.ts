import { fileApi } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'

type CreateFileParams = {
  ownerId: string,
  fileName: string,
  formData: FormData
}

type DeleteFileParams = {
  ownerId: string,
  url: string,
}

interface FilesRepository extends Omit<() => IRepository, 'read' | 'update'> {
  create: (params: CreateFileParams) => Promise<{ data: { data: any } }>
  delete: (params: DeleteFileParams) => Promise<{ data: { data: boolean } }>
}

class Repository implements FilesRepository {
  private rest: IRest

  constructor(rest){
    this.rest = rest
  }

  create({ ownerId, fileName, formData }){
    return this.rest.post(`/v1/assets?id=${ ownerId }&&fileName=${ fileName }`, formData)
  }

  delete({ ownerId, url }){
    return this.rest.delete(`/v1/assets?id=${ ownerId }&&url=${ url }`)
  }
}

export const useFilesRepository = () => new Repository(fileApi) as FilesRepository
