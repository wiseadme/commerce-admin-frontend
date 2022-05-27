export class ProductModel implements IProductModel {
  name: IProductModel['name']
  price: IProductModel['price']
  count: IProductModel['count']
  unit: IProductModel['unit']
  isVisible: IProductModel['isVisible']
  categories: IProductModel['categories']
  description: IProductModel['description']
  image: IProductModel['image']
  assets: IProductModel['assets']
  attributes: IProductModel['attributes']
  variants: IProductModel['variants']
  seo: IProductModel['seo']
  url: IProductModel['url']

  constructor({
    name = '',
    price = 0,
    count = 0,
    unit = '',
    categories = [],
    description = '',
    image = null,
    assets = null,
    attributes = null,
    variants = null,
    isVisible = true,
    url = '',
    seo = {
      title: '',
      description: '',
      keywords: ''
    }
  }){
    this.name = name
    this.price = price
    this.count = count
    this.unit = unit
    this.image = image
    this.assets = assets
    this.categories = categories
    this.description = description
    this.attributes = attributes
    this.variants = variants
    this.isVisible = isVisible
    this.seo = seo
    this.url = url
  }

  static create(product = {}){
    return new ProductModel(product)
  }
}
