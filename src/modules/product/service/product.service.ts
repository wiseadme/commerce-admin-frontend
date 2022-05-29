import { Store } from 'vuezone'
import { useProductStore } from '@modules/product/store'
import { useFilesService, Service as FilesService } from '@shared/services/files.service'

class Service {
  private _store: Store<IProductState, IProductActions>
  private _product: Maybe<IProduct>
  public files: FilesService

  constructor(store, filesService){
    this._store = store
    this._product = null
    this.files = filesService
  }

  get products(){
    return this._store.state.products
  }

  get product(){
    return this._product
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

  updateProduct(updates){
    return this._store.update(updates)
      .catch(err => console.log(err))
  }

  getProducts(){
    this._store.read().catch(err => console.log(err))
  }

  async uploadProductImage(files){
    if (!files.length) return

    const { formData, fileName } = this.files.createFormData(files)
    const ownerId = this._product!._id

    const asset: any = await this.files.uploadFile({ ownerId, fileName, formData })

    if (asset && asset.url) {
      let { assets } = this._product!
      assets = assets ? assets : []

      assets.push(asset)

      await this.updateProduct({
        _id: this._product?._id,
        assets
      })
    }
  }
}

export const useProductService = () => new Service(
  useProductStore(),
  useFilesService()
)
