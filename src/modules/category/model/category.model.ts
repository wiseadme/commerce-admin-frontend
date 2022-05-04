import { reactive } from 'vue'

interface ICategory {
  title: string
  url: string
  image: Maybe<string>
  seo: {
    title: Maybe<string>
    description: Maybe<string>
    keywords: Maybe<string>
  }
  parent: Maybe<string>
  children: Array<any>
  assets: Array<{ url: string }>
  order: number
}

export const categoryModel = reactive<ICategory>({
  title: '',
  url: '',
  image: null,
  seo: {
    title: null,
    description: null,
    keywords: null
  },
  parent: null,
  children: [],
  assets: [],
  order: 0
})
