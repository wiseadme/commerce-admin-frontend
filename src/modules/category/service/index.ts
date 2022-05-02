import { categoryStore } from '@modules/category/store'
import { reactive } from 'vue'

export const useCategoryService = () => {
  const category = reactive({
    title: null,
    url: null,
    image: null,
    seo: {
      title: null,
      description: null,
      keywords: null,
    },
    parent: null,
    children: [],
    order: 0,
  })

  const updates = {}

  const prepareCategory = () => {
    category.parent ? (category.parent = (category.parent as any)._id) : false
  }

  const createCategory = async () => {
    prepareCategory()
    return await categoryStore.dispatch('createCategory', category)
  }

  const updateCategory = async (updates) => {
    return await categoryStore.dispatch('updateCategory', updates)
  }

  const getAllCategories = async () => {
    return await categoryStore.dispatch('getAllCategories')
  }

  return {
    updates,
    category,
    createCategory,
    updateCategory,
    getAllCategories,
  }
}
