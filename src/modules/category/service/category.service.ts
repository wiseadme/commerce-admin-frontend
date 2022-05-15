import { ref, Ref } from 'vue'
import { useCategoryStore } from '@modules/category/store'
import { Store } from 'vuezone'

class Service implements ICategoryService {
  private _store: Store<ICategoryState, ICategoryActions>
  private _updates: Ref<Partial<ICategoryUpdates>>
  private _category: Ref<Maybe<ICategory>>

  constructor(store){
    this._store = store
    this._category = ref(null)
    this._updates = ref({})
  }

  get categories(){
    return this._store.state.categories
  }

  get updateCategory(){
    return this._store.update
  }

  get getCategories(){
    return this._store.read
  }

  get deleteCategory(){
    return this._store.delete
  }

  get deleteCategoryImage(){
    return this._store.deleteImage
  }

  get uploadCategoryImage(){
    return this._store.uploadImage
  }

  get createCategory(){
    return this._store.create
  }

  setAsCurrent(category: Maybe<ICategory>){
    this._category.value = category
  }

  async deleteCategoryHandler(category){
    await this.deleteCategory(category)
  }

  async updateHandler(updates: Partial<ICategoryUpdates>){
    this._updates.value = Object.assign({}, updates, this._updates.value)

    await this.updateCategory(this._updates.value)
    return this.getCategories()
  }

  async uploadImageHandler(files){
    if (!files.length) return

    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    const asset: any = await this.uploadCategoryImage(
      this._category.value!._id,
      file.name,
      formData
    )

    if (asset && asset.url) {
      this._updates.value.image = asset.url
    }

    return asset.url
  }

  createCategoryHandler(model){
    return this.createCategory(model)
  }

  async deleteImageHandler(url){
    const id = this._category.value!._id
    await this.deleteCategoryImage(id, url)

    this._updates.value.image = null
    this._category.value!.image = null
  }
}

export const useCategoryService = () => new Service(useCategoryStore())
