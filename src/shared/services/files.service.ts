import { useFilesStore } from '@shared/store/files'
import { useEventBus } from '@shared/composables/use-event-bus'

export class Service {
  private _store: any
  private _events: ReturnType<typeof useEventBus>

  constructor(store, eventBus){
    this._store = store
    this._events = eventBus

    this.addListeners()
  }

  createFormData(files){
    const formData = new FormData()
    const file = files[files.length - 1]
    const fileName = file.name

    formData.append('image', file)

    return { formData, fileName }
  }

  addListeners(){
    this._events.add('upload:file', this.uploadFile.bind(this))
    this._events.add('update:file', this.updateFile.bind(this))
    this._events.add('delete:file', this.deleteFile.bind(this))
    this._events.add('create:data', this.createFormData.bind(this))
  }

  async uploadFile({ ownerId, fileName, formData }){
    return await this._store.uploadFile({ ownerId, fileName, formData })
  }

  async updateFile(updates){
    return this._store.update(updates)
  }

  async deleteFile({ ownerId, url }){
    return await this._store.deleteFile({ ownerId, url })
  }
}

export const useFilesService = () => new Service(useFilesStore(), useEventBus())
