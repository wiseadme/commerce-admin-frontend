import { useCategoryStore } from '@modules/category/store'

export const useCategoryService = () => {
  const store = useCategoryStore()

  const updates = {}

  const prepareCategory = (category) => {
    category.parent ? (category.parent = (category.parent as any)._id) : false
  }

  const createCategory = (category) => {
    prepareCategory(category)
    return store.createCategory(category)
  }

  const updateParentCategory = (category) => {
    if (category.parent) {
      const parent = store.state.categories!.find(
        (c) => c._id === category.parent
      )

      updateCategory({
        _id: category.parent,
        children: [ ...parent.children, category._id ]
      })
    }
  }

  const updateCategory = (updates) => {
    return store.updateCategory(updates)
  }

  const getAllCategories = () => {
    return store.getAllCategories()
  }

  return {
    updates,
    createCategory,
    updateParentCategory,
    updateCategory,
    getAllCategories
  }
}
