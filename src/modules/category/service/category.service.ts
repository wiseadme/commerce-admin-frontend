import { useCategoryStore } from '@modules/category/store'
import { Store } from 'vuezone'

class Service implements ICategoryService {
  store: Store<ICategoryState, ICategoryActions>

  constructor(store){
    this.store = store
  }

  createCategory(category: ICategoryModel){
    return this.store.createCategory(category)
      .then(this.updateParentCategory.bind(this))
  }

  updateParentCategory(category: ICategory){
    if (!category.parent) return

    const { categories } = this.store.state

    const parent = categories!.find(
      (c) => c._id === category.parent!._id
    )

    parent!.children?.push(category)

    const updates = {
      _id: category.parent._id,
      children: parent!.children
    }

    return this.store.updateCategory(updates)
  }

  updateCategory(updates){
    return this.store.updateCategory(updates)
  }

  getAllCategories(){
    return this.store.getCategories()
  }

  deleteCategory(category: ICategory){
    return this.store.deleteCategory(category)
  }

  deleteCategoryImage(id, url) {
    return this.store.deleteCategoryImage(id, url)
  }

  uploadCategoryImage = (id: string, files: File[]) => {
    if (!files.length) return

    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    return this.store.uploadCategoryImage(id, file.name, formData)
  }
}

export const service = new Service(useCategoryStore())
