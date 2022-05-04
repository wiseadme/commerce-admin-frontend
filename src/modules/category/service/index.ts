import { state, actions } from '@modules/category/store'
import { useUploadsStore } from '@shared/store/files'
import { categoryModel } from '@modules/category/model/category.model'

export const useCategoryService = () => {
  const uploadsStore = useUploadsStore()
  const updates = {}

  const prepareCategory = (category) => {
    category.parent ? (category.parent = (category.parent as any)._id) : false
  }

  const createCategory = (category) => {
    prepareCategory(category)
    return actions.createCategory(category)
  }

  const updateParentCategory = (category) => {
    if (category.parent) {
      const parent = state.categories!.find(
        (c) => c._id === category.parent._id
      )

      updateCategory({
        _id: category.parent._id,
        children: [ ...parent.children, category._id ]
      })
        .then(ctg => console.log(ctg, 'updated'))
    }
  }

  const updateCategory = (updates) => {
    return actions.updateCategory(updates)
  }

  const getAllCategories = () => {
    return actions.getAllCategories()
  }

  const uploadCategoryImage = (files: File[]) => {
    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    uploadsStore.uploadImage(file.name, formData)
      .then(file => {
        categoryModel.assets.push(file)
        categoryModel.image = file.url
      })
  }

  return {
    updates,
    createCategory,
    updateParentCategory,
    updateCategory,
    getAllCategories,
    uploadCategoryImage
  }
}
