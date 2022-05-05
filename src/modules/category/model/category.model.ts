import { reactive } from 'vue'

class CategoryModel implements ICategoryModel {
  title: ICategoryModel['title']
  url: ICategoryModel['url']
  image: ICategoryModel['image']
  parent: ICategoryModel['parent']
  children: ICategoryModel['children']
  order: ICategoryModel['order']
  seo: ICategoryModel['seo']

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

  static create() {
    return new CategoryModel()
  }
}

export const categoryModel = reactive<ICategoryModel>(CategoryModel.create())
