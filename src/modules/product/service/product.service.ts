import { Store } from 'vuezone'
import { useProductStore } from '@modules/product/store'

export class Service {
  _store: Store<IProductState, IProductActions>
  _product: Maybe<IProduct>

  constructor(store){
    this._store = store
    this._product = null
  }

  get products(){
    return this._store.state.products
  }

  setAsCurrent(product){
    this._product = product
  }

  createProduct(product){
    this._store.create(product)
      .then(() => this.getProducts())
      .catch(err => console.log(err))
  }

  deleteProduct(product){
    this._store.delete(product)
      .catch(err => console.log(err))
  }

  getProducts(){
    this._store.read().catch(err => console.log(err))
  }

  async uploadProductImage(files){
    if (!files.length) return

    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    const asset: any = await this._store.uploadImage(
      this._product!._id,
      file.name,
      formData
    )

    // if (asset && asset.url) {
    //   await this.updateCategory({
    //     _id: this._category!._id,
    //     image: asset.url
    //   })
    // }

    return asset.url
  }
}

export const useProductService = () => new Service(useProductStore())
