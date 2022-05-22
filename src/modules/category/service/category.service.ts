import { useCategoryStore } from '@modules/category/store'
import { Store } from 'vuezone'

class Service implements ICategoryService {
  private _store: Store<ICategoryState, ICategoryActions>
  private _category: Maybe<ICategory>

  constructor(store){
    this._store = store
    this._category = null
  }

  get categories(){
    return this._store.state.categories
  }

  get category() {
    return this._category
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
    this._category = category
  }

  async deleteCategoryHandler(category){
    return await this.deleteCategory(category)
      .then(() => this.getCategories())
  }

  async updateHandler(updates: Partial<ICategoryUpdates>){
    return await this.updateCategory(updates)
      .then(() => this.getCategories())
  }

  async uploadImageHandler(files){
    if (!files.length) return

    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    const asset: any = await this.uploadCategoryImage(
      this._category!._id,
      file.name,
      formData
    )

    if (asset && asset.url) {
      await this.updateHandler({
        _id: this._category!._id,
        image: asset.url
      })
    }

    return asset.url
  }

  createCategoryHandler(model){
    return this.createCategory(model)
      .then(() => this.getCategories())
  }

  async deleteImageHandler(url){
    const id = this._category!._id

    await this.deleteCategoryImage(id, url)
    return this.updateHandler({ _id: id, image: null })
  }
}

export const useCategoryService = () => new Service(useCategoryStore())
