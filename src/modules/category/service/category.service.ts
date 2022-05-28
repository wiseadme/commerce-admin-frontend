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

  get category(){
    return this._category
  }

  get deleteCategoryImage(){
    return this._store.deleteImage
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

    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    const asset: any = await this._store.uploadImage(
      this._category!._id,
      file.name,
      formData
    )

    if (asset && asset.url) {
      await this.updateCategory({
        _id: this._category!._id,
        image: asset.url
      })
    }

    return asset.url
  }

  async deleteImageHandler(url){
    const id = this._category!._id

    await this.deleteCategoryImage(id, url)
    return this.updateCategory({ _id: id, image: null })
  }
}

export const useCategoryService = () => new Service(useCategoryStore())
