import { useCategoryStore } from '@modules/category/store'
import { useUploadsStore } from '@shared/store/files'
import { categoryModel } from '@modules/category/model/category.model'
import { Store } from 'vuezone'

class Service {
  private _store: Store<ICategoryState, ICategoryActions>
  private _model: ICategory

  constructor(store, model) {
    this._model = model
    this._store = store
  }

  createCategory() {
    return this._store.createCategory(this._model)
  }

  async updateParentCategory(category) {
    if (!category.parent) return

    const parent = this._store.state.categories!.find(
      (c) => c._id === category.parent._id
    )

    await this._store.updateCategory({
      _id: category.parent._id,
      children: [ ...parent.children, category._id ]
    })
  }

  updateCategory(updates) {
    return this._store.updateCategory(updates)
  }

  getAllCategories() {
    return this._store.getAllCategories()
  }

  uploadCategoryImage = (files: File[]) => {
    const upload = useUploadsStore()
    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    upload.uploadImage(file.name, formData)
      .then(file => {
        categoryModel.image = file.url
      })
  }
}

export const service = new Service(
  useCategoryStore(),
  categoryModel
)
