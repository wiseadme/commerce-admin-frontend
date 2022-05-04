import { useCategoryStore } from '@modules/category/store'
import { useUploadsStore } from '@shared/store/files'
import { categoryModel } from '@modules/category/model/category.model'
import { Store } from 'vuezone'

class Service implements ICategoryService {
  private _store: Store<ICategoryState, ICategoryActions>

  constructor(store) {
    this._store = store
  }

  createCategory(category) {
    return this._store.createCategory(category)
  }

  updateParentCategory(category) {
    if (!category.parent) return

    const { categories } = this._store.state

    const parent = categories!.find((c) => c._id === category.parent._id)

    parent.children.push(category._id)

    const updates = {
      _id: category.parent._id,
      children: parent.children,
    }

    this._store.updateCategory(updates)
  }

  getAllCategories() {
    return this._store.getAllCategories()
  }

  uploadCategoryImage = (files: File[]) => {
    const upload = useUploadsStore()
    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    upload
      .uploadImage(file.name, formData)
      .then((file) => (categoryModel.image = file.url))
  }
}

export const service = new Service(useCategoryStore())
