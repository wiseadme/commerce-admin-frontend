export class ProductModel implements IProductModel {
  name: IProductModel['name']
  price: IProductModel['price']
  categories: IProductModel['categories']


  constructor(){
    this.name = ''
    this.price = 0
    this.categories = []
  }

  static create(){
    return new ProductModel()
  }
}
