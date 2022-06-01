import { useCategoryStore } from '@modules/category/store'
import { Store } from 'vuezone'
import { useEventBus } from '@shared/composables/use-event-bus'
import { useFilesService } from '@shared/services/files.service'

class Service implements ICategoryService {
  private _store: Store<ICategoryState, ICategoryActions>
  private _category: Maybe<ICategory>
  private _events: ReturnType<typeof useEventBus>

  constructor(store, eventBus){
    this._store = store
    this._category = null
    this._events = eventBus

    this.addListeners()
  }

  get categories(){
    return this._store.state.categories
  }

  get category(){
    return this._category
  }

  get deleteCategoryImage(){
    return this._store.deleteImage
  }

  addListeners(){
    this._events.add('get:categories', this.onGetCategories.bind(this))
  }

  setAsCurrent(category: Maybe<ICategory>){
    this._category = category
  }

  createCategory(model){
    return this._store.create(model)
      .then(() => this.getCategories())
  }

  getCategories(){
    this._store.read().catch(err => console.log(err))
  }

  onGetCategories(){
    if (this.categories) return this.categories
    return this.getCategories()
  }

  updateCategory(updates){
    return this._store.update(updates)
      .then(() => this.getCategories())
      .catch(err => console.log(err))
  }

  deleteCategory(category){
    this._store.delete(category)
      .then(() => this.getCategories())
      .catch(err => console.log(err))
  }

  async uploadCategoryImage(files){
    if (!files.length) return

    const { formData, fileName } = await this._events.emit('create:data', files)
    const ownerId = this._category!._id

    const asset = await this._events.emit(
      'upload:file',
      { ownerId, fileName, formData }
    )

    if (asset && asset.url) {
      await this.updateCategory({ _id: this._category!._id, image: asset.url })
    }

    return asset.url
  }

  async deleteImageHandler(url){
    const ownerId = this._category!._id

    await this._events.emit('delete:file', { ownerId, url })
    return this.updateCategory({ _id: ownerId, image: null })
  }
}

export const useCategoryService = () => {
  useFilesService()

  return new Service(
    useCategoryStore(),
    useEventBus()
  )
}
