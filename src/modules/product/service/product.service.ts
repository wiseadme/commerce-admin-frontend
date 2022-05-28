import { Store } from 'vuezone'
import { useProductStore } from '@modules/product/store'
import { useFilesService, Service as FilesService } from '@shared/services/files.service'

class Service {
  private _store: Store<IProductState, IProductActions>
  private _product: Maybe<IProduct>
  public _files: FilesService

  constructor(store, filesService){
    this._store = store
    this._product = null
    this._files = filesService
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

    const { formData, file } = this._files.createFormData(files)
    const ownerId = this._product!._id
    const fileName = file.name

    const asset: any = await this._files.uploadFile({ ownerId, fileName, formData })

    return asset.url
  }
}

export const useProductService = () => new Service(
  useProductStore(),
  useFilesService()
)
