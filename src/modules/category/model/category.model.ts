export class CategoryModel implements ICategoryModel {
  title: ICategoryModel['title']
  url: ICategoryModel['url']
  image: ICategoryModel['image']
  parent: ICategoryModel['parent']
  children: ICategoryModel['children']
  order: ICategoryModel['order']
  seo: ICategoryModel['seo']
  isVisible: ICategoryModel['isVisible']

  constructor({
    title = '',
    url = '',
    image = null,
    parent = null,
    children = null,
    isVisible = true,
    order = 0,
    seo = {
      title: null,
      description: null,
      keywords: null
    }
  }){
    this.title = title
    this.url = url
    this.image = image
    this.parent = parent
    this.children = children
    this.order = order
    this.seo = seo
    this.isVisible = isVisible
  }

  static create(params = {}){
    return new CategoryModel(params)
  }
}
