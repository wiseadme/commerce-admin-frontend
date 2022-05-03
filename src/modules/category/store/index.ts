import { reactive } from 'vue'
import { Maybe } from '@shared/types/utils'
import { categoryRepository } from '@modules/category/repository'

type State = {
  categories: Maybe<Array<any>>
}

export const createCategoryStore = () => {
  const state = reactive<State>({
    categories: null
  })

  const createCategory = async (category) => {
    try {
      const { data } = await categoryRepository.create(category)
      state.categories?.push(data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const updateCategory = async (updates) => {
    try {
      const { data } = await categoryRepository.update(updates)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const getAllCategories = async () => {
    try {
      const { data } = await categoryRepository.read()
      state.categories = data.data
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return {
    state,
    createCategory,
    updateCategory,
    getAllCategories
  }
}

const store = createCategoryStore()

export const useCategoryStore = () => store
