import { Store } from 'vuezone'
import { useProductStore } from '@modules/product/store'
import { Service as FilesService, useFilesService } from '@shared/services/files.service'

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

  setAsCurrent(product: IProduct){
    this._product = product
  }

  createProduct(product: IProductModel){
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

    const asset: IProductAsset = await this.files.uploadFile({
      ownerId,
      fileName,
      formData
    })

    if (asset && asset.url) {
      let { assets } = this._product!
      assets = assets || []

      asset.main = asset.main || !assets.length

      if (asset.main) {
        await this.files.updateFile({
          _id: asset._id,
          main: true
        })
      }

      assets.push(asset)

      await this.updateProduct({
        _id: ownerId,
        assets
      })
    }
  }

  async deleteProductImage(url){
    const ownerId = this._product!._id

    await this.files.deleteFile({ ownerId, url })

    let assets = this._product!.assets?.filter(it => it.url !== url)
    this._product!.assets = assets!

    if (assets && assets.length && !assets?.find(it => it.main)) {
      assets[0] = await this.files.updateFile({
        _id: assets?.[0]._id,
        main: true
      })
    }

    await this.updateProduct({
      _id: ownerId,
      assets
    })
  }
}

export const useProductService = () => new Service(
  useProductStore(),
  useFilesService()
)
