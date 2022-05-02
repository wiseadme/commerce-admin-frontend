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
    order: 0
  })

  const createCategory = async () => {
    const data = await categoryStore.dispatch('createCategory', category)
    console.log(data)
  }

  return {
    category,
    createCategory
  }
}
