import { state, actions } from '@modules/category/store'

export const useCategoryService = () => {

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
        (c) => c._id === category.parent
      )

      updateCategory({
        _id: category.parent,
        children: [ ...parent.children, category._id ]
      })
    }
  }

  const updateCategory = (updates) => {
    return actions.updateCategory(updates)
  }

  const getAllCategories = () => {
    return actions.getAllCategories()
  }

  return {
    updates,
    createCategory,
    updateParentCategory,
    updateCategory,
    getAllCategories
  }
}
