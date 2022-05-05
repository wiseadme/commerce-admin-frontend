import { useCategoryStore } from '@modules/category/store'
import { useUploadsStore } from '@shared/store/files'
import { Store } from 'vuezone'

class Service implements ICategoryService {
  store: Store<ICategoryState, ICategoryActions>

  constructor(store) {
    this.store = store
  }

  createCategory(category) {
    return this.store.createCategory(category)
  }

  updateParentCategory(category) {
    if (!category.parent) return

    const { categories } = this.store.state

    const parent = categories!.find((c) => c._id === category.parent._id)

    parent.children.push(category._id)

    const updates = {
      _id: category.parent._id,
      children: parent.children,
    }

    return this.store.updateCategory(updates)
  }

  getAllCategories() {
    return this.store.getAllCategories()
  }

  uploadCategoryImage = (files: File[]) => {
    const uploadStore = useUploadsStore()

    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    return uploadStore.uploadImage(file.name, formData)
  }
}

export const service = new Service(useCategoryStore())
