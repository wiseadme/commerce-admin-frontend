import { Store } from 'vuezone'
import { useProductStore } from '@modules/product/store'
import { Service as FilesService, useFilesService } from '@shared/services/files.service'
import { ref, Ref } from 'vue'

class Service {
  private _store: Store<IProductState, IProductActions>
  private _product: Ref<Maybe<IProduct>>
  public files: FilesService

  constructor(store, filesService){
    this._store = store
    this._product = ref(null)
    this.files = filesService
  }

  get products(){
    return this._store.state.products
  }

  get product(){
    return this._product.value
  }

  setAsCurrent(product: IProduct){
    this._product.value = product
  }

  createProduct(product: IProductModel){
    return this._store.create(product)
      .then(() => this.getProducts())
      .catch(err => console.log(err))
  }

  deleteProduct(product){
    this._store.delete(product).catch(err => console.log(err))
  }

  updateProduct(updates){
    updates!._id = this._product.value?._id!

    return this._store.update(updates)
      .then(pr => this._product.value = pr)
      .catch(err => console.log(err))
  }

  getProducts(){
    this._store.read().catch(err => console.log(err))
  }

  async uploadProductImage(files){
    if (!files.length) return

    const { formData, fileName } = this.files.createFormData(files)
    const ownerId = this._product.value!._id

    const asset: IProductAsset = await this.files.uploadFile({
      ownerId,
      fileName,
      formData
    })

    if (asset && asset.url) {
      let { assets } = this._product.value!
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
    const ownerId = this._product.value!._id

    await this.files.deleteFile({ ownerId, url })

    let assets = this._product.value!.assets?.filter(it => it.url !== url)
    this._product.value!.assets = assets!

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
