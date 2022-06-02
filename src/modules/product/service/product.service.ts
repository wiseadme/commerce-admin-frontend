import { Store } from 'vuezone'
import { useProductStore } from '@/modules/product/store'
import { ref, Ref } from 'vue'
import { Observer } from '@shared/plugins/observer'

class Service extends Observer {
  private _store: Store<IProductState, IProductActions>
  private _product: Ref<Maybe<IProduct>>
  private _attributes: Maybe<Array<IProductAttribute>>
  private _categories: Maybe<Array<ICategory>>

  constructor(store){
    super()
    this._store = store
    this._product = ref(null)
    this._attributes = null
    this._categories = null
  }

  get products(){
    return this._store.state.products
  }

  get product(){
    return this._product.value
  }

  get attributes(){
    return this._attributes
  }

  get categories(){
    return this._categories
  }

  async getAttributes(){
    this._attributes = await this.emit('get:attributes')
  }

  async getCategories(){
    this._categories = await this.emit('get:categories')
  }

  getProducts(){
    return this._store.read().catch(err => console.log(err))
  }

  setAsCurrent(product: IProduct){
    this._product.value = product
  }

  createProduct(product: IProduct){
    return this._store.create(product)
      .then(() => this.getProducts())
      .catch(err => console.log(err))
  }

  deleteProduct(product){
    this._store.delete(product).catch(err => console.log(err))
  }

  updateProduct(updates){
    return this._store.update(updates)
      .then(pr => this._product.value = pr)
      .catch(err => console.log(err))
  }

  async uploadProductImage(files){
    if (!files.length) return

    const { formData, fileName } = await this.emit('create:data', files)
    const ownerId = this._product.value!._id

    const asset: IProductAsset = await this.emit(
      'upload:file',
      { ownerId, fileName, formData }
    )

    if (asset && asset.url) {
      let { assets } = this._product.value!
      assets = assets || []
      asset.main = asset.main || !assets.length

      if (asset.main) {
        await this.emit('update:file', {
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

    await this.emit('delete:file', { ownerId, url })

    let assets = this._product.value!.assets?.filter(it => it.url !== url)
    this._product.value!.assets = assets!

    if (assets && assets.length && !assets?.find(it => it.main)) {
      assets[0] = await this.emit('update:file', {
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

const service = new Service(useProductStore())
export const useProductService = () => service
