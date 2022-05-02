import { useCategoryStore } from '@modules/category/store'
import { reactive } from 'vue'

export const useCategoryService = () => {
  const category = reactive({
    title: null,
    url: null,
    image: null,
    seo: {
      title: null,
      description: null,
      keywords: null
    },
    parent: null,
    children: [],
    order: 0
  })
  const store = useCategoryStore()
  const updates = {}

  const prepareCategory = () => {
    category.parent ? (category.parent = (category.parent as any)._id) : false
  }

  const createCategory = () => {
    prepareCategory()
    return store.dispatch('createCategory', category)
  }

  const updateParentCategory = (ctg) => {
    if (ctg.parent) {
      const parent = store.state.categories!.find(
        (c) => c._id === ctg.parent
      )

      updateCategory({
        _id: ctg.parent,
        children: [ ...parent.children, ctg._id ]
      })
    }
  }

  const updateCategory = (updates) => {
    return store.dispatch('updateCategory', updates)
  }

  const getAllCategories = () => {
    return store.dispatch('getAllCategories')
  }

  return {
    updates,
    category,
    createCategory,
    updateParentCategory,
    updateCategory,
    getAllCategories
  }
}
