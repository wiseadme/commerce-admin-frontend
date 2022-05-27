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
}

export const useProductService = () => new Service(useProductStore())
