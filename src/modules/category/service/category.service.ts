import { useCategoryStore } from '@modules/category/store'
import { Store } from 'vuezone'

class Service implements ICategoryService {
  store: Store<ICategoryState, ICategoryActions>

  constructor(store){
    this.store = store
  }

  createCategory(category: ICategoryModel){
    this.store.createCategory(category)
      .then(ctg => this.updateParentCategory(ctg))
      .catch((err) => console.log(err))
  }

  updateParentCategory(category: ICategory){
    if (!category.parent) return

    const { categories } = this.store.state

    const parent = categories!.find((c) => c._id === category.parent!._id)

    parent!.children?.push(category)

    const updates = {
      _id: category.parent._id,
      children: parent!.children
    }

    return this.store.updateCategory(updates)
  }

  getAllCategories(){
    return this.store.getCategories()
  }

  deleteCategory(category){
    this.store.deleteCategory(category)
    this.store.deleteCategoryImage(category.image.split('/')[2])
  }

  uploadCategoryImage = (files: File[]) => {
    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    return this.store.uploadCategoryImage(file.name, formData)
  }
}

export const service = new Service(useCategoryStore())
