import { Store } from 'vuezone'
import { useProductStore } from '@modules/product/store'
import { ref, Ref } from 'vue'
import { useEventBus } from '@shared/composables/use-event-bus'
import { useFilesService } from '@shared/services/files.service'
import { useCategoryService } from '@modules/category/service/category.service'
import { useAttributeService } from '@modules/attribute/service/attribute.service'

class Service {
  private _store: Store<IProductState, IProductActions>
  private _product: Ref<Maybe<IProduct>>
  private _attributes: Maybe<Array<IProductAttribute>>
  private _categories: Maybe<Array<ICategory>>
  private _events: ReturnType<typeof useEventBus>

  constructor(store, eventBus){
    this._store = store
    this._product = ref(null)
    this._attributes = null
    this._categories = null
    this._events = eventBus
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
    this._attributes = await this._events.emit('get:attributes')
  }

  async getCategories(){
    this._categories = await this._events.emit('get:categories')
  }

  getProducts(){
    return this._store.read().catch(err => console.log(err))
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

  async uploadProductImage(files){
    if (!files.length) return

    const { formData, fileName } = await this._events.emit('create:data', files)
    const ownerId = this._product.value!._id

    const asset: IProductAsset = await this._events.emit(
      'upload:file',
      { ownerId, fileName, formData }
    )

    if (asset && asset.url) {
      let { assets } = this._product.value!
      assets = assets || []

      asset.main = asset.main || !assets.length

      if (asset.main) {
        await this._events.emit('update:file', {
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

    await this._events.emit('delete:file', { ownerId, url })

    let assets = this._product.value!.assets?.filter(it => it.url !== url)
    this._product.value!.assets = assets!

    if (assets && assets.length && !assets?.find(it => it.main)) {
      assets[0] = await this._events.emit('update:file', {
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

export const useProductService = () => {
  useFilesService()
  useCategoryService()
  useAttributeService()

  return new Service(
    useProductStore(),
    useEventBus()
  )
}
