import { reactive } from 'vue'

export const categoryModel = reactive<ICategory>({
  title: '',
  url: '',
  image: null,
  parent: null,
  children: [],
  order: 0,
  seo: {
    title: null,
    description: null,
    keywords: null
  }
})
