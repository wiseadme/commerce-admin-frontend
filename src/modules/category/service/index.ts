import { categoryStore } from '@modules/category/store'
import { reactive } from 'vue'

export const useCategoryService = () => {

  const category = reactive({
    title: '',
    url: '',
    image: '',
    seo: {
      title: '',
      description: '',
      keywords: ''
    },
    parent: '',
    children: [],
    order: 0
  })

  const createCategory = async () => {
    const data = await categoryStore.dispatch('createCategory', category)
    console.log(data)
  }

  const getAllCategories = async () => {
    const data = await categoryStore.dispatch('getAllCategories')
    console.log(data)
  }

  return {
    category,
    createCategory,
    getAllCategories
  }
}
