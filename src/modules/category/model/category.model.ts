import { reactive } from 'vue'

class CategoryModel implements ICategory {
  title: ICategory['title']
  url: ICategory['url']
  image: ICategory['image']
  parent: ICategory['parent']
  children: ICategory['children']
  order: ICategory['order']
  seo: ICategory['seo']

  constructor() {
    this.title = ''
    this.url = ''
    this.image = null
    this.parent = null
    this.children = null
    this.order = 0
    this.seo = {
      title: null,
      description: null,
      keywords: null,
    }
  }
}

export const categoryModel = reactive<ICategory>(new CategoryModel())
