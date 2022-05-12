import { ref, Ref } from 'vue'
import { useCategoryStore } from '@modules/category/store'
import { Store } from 'vuezone'

class Service implements ICategoryService {
  private _store: Store<ICategoryState, ICategoryActions>
  private _updates: Ref<Partial<ICategoryUpdates>>
  private _current: Ref<Maybe<ICategory>>
  private _parent: Maybe<ICategory>

  constructor(store){
    this._store = store
    this._current = ref(null)
    this._updates = ref({})
    this._parent = null
  }

  get parentChildrenIds(){
    return this._parent!.children.map(c => c._id)
  }

  get categories(){
    return this._store.state.categories
  }

  get updateCategory(){
    return this._store.update
  }

  get getAllCategories(){
    return this._store.read
  }

  get deleteCategory(){
    return this._store.delete
  }

  get deleteCategoryImage(){
    return this._store.deleteImage
  }

  get uploadCategoryImage(){
    return this._store.uploadImage
  }

  get createCategory(){
    return this._store.create
  }

  setAsCurrent(category: Maybe<ICategory>){
    this._current.value = category
    category?.parent && this.setParent()
  }

  setParent(){
    this._parent = this.categories!.find(
      (c) => c._id === this._current.value!.parent!._id
    )!
  }

  removeFromParentChildren(){
    this._parent!.children = this._parent!.children.filter(
      it => it._id !== this._current.value!._id
    )
  }

  async updateOldParent(){
    console.log('old parent', this._parent, this._current.value)
    this.removeFromParentChildren()
    console.log('old parent after', this._parent, this._current.value)
    await this.updateCategory({
      _id: this._parent?._id,
      children: this.parentChildrenIds
    })
  }

  async deleteCategoryHandler(category){
    await this.deleteCategory(category)

    this.removeFromParentChildren()

    return this.updateCategory({
      _id: this._parent!._id,
      children: this.parentChildrenIds
    })
  }

  async updateHandler(update: Partial<ICategoryModel>){
    this._updates.value = Object.assign({}, update, this._updates.value)

    if (!Object.keys(this._updates.value).length) return

    this._updates.value._id = this._current.value!._id

    await this.updateCategory(this._updates.value)
      .then(async (ctg) => {
        if (this._parent) await this.updateOldParent()

        this.setAsCurrent(ctg)
        this._updates.value = {}
      })
      .then(() => this.updateParent(this._current.value!))

    return this._current.value
  }

  async uploadImageHandler(files){
    if (!files.length) return

    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    const asset: any = await this.uploadCategoryImage(
      this._current.value!._id,
      file.name,
      formData
    )

    if (asset && asset.url) {
      this._updates.value.image = asset.url
    }
  }

  createCategoryHandler(model){
    return this.createCategory(model)
      .then(ctg => this.updateParent(ctg))
  }

  async deleteImageHandler(url){
    const id = this._current.value!._id
    await this.deleteCategoryImage(id, url)

    this._updates.value.image = null
    this._current.value!.image = null
  }

  updateParent(category: ICategory){
    this.setAsCurrent(category)
    if (!this._parent) return

    if (this._parent?.children) {
      this.removeFromParentChildren()
    }

    const updates: any = {}
    this._parent!.children.push(category)

    updates.children = this.parentChildrenIds
    updates._id = this._parent!._id

    return this.updateCategory(updates)
  }
}

export const useCategoryService = () => new Service(useCategoryStore())
