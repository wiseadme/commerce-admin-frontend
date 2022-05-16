export class ProductModel implements IProductModel {
  name: IProductModel['name']
  price: IProductModel['price']
  categories: IProductModel['categories']
  description: IProductModel['description']
  image: IProductModel['image']
  assets: IProductModel['assets']
  attributes: IProductModel['attributes']
  variants: IProductModel['variants']

  constructor({
    name = '',
    price = 0,
    categories = [],
    description = '',
    image = null,
    assets = null,
    attributes = null,
    variants = null
  }){
    this.name = name
    this.price = price
    this.image = image
    this.assets = assets
    this.categories = categories
    this.description = description
    this.attributes = attributes
    this.variants = variants
  }

  static create(product = {}){
    return new ProductModel(product)
  }
}
