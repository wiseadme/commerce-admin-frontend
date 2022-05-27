import { Store } from 'vuezone'
import { useProductStore } from '@modules/product/store'

export class Service {
  _store: Store<IProductState, IProductActions>
  _product: Maybe<IProduct>

  constructor(store){
    this._store = store
    this._product = null
  }

  get createProduct(){
    return this._store.create
  }

  get deleteProduct(){
    return this._store.delete
  }

  get products(){
    return this._store.state.products
  }

  get getProducts(){
    return this._store.read
  }

  createProductHandler(product){
    return this.createProduct(product)
      .then(() => this.getProducts())
  }

  deleteProductHandler(product){
    return this.deleteProduct(product)
  }
}

export const useProductService = () => new Service(useProductStore())
