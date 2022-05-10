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

  get current(){
    return this._current.value
  }

  get updates(){
    return this._updates.value
  }

  get parent(){
    return this._parent
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
      (c) => c._id === this.current!.parent!._id
    )!
  }

  removeFromParentChildren(){
    this._parent!.children = this._parent!.children.filter(
      it => it._id !== this.current!._id
    )
  }

  async updateOldParent(){
    this.removeFromParentChildren()

    await this.updateCategory({
      _id: this.parent?._id,
      children: this.parentChildrenIds
    })
  }

  async deleteCategoryHandler(category){
    await this.deleteCategory(category)

    this.removeFromParentChildren()

    return this.updateCategory({
      _id: this.parent!._id,
      children: this.parentChildrenIds
    })
  }

  async updateHandler(update: Partial<ICategoryModel>){
    this._updates.value = Object.assign({}, update, this.updates)

    if (!Object.keys(this.updates).length) return

    this._updates.value._id = this.current!._id

    await this.updateCategory(this.updates)
      .then(async (ctg) => {
        if (this._parent) await this.updateOldParent()

        this.setAsCurrent(ctg)
        this._updates.value = {}
      })
      .then(() => this.updateParent(this.current!))

    return this.current
  }

  async uploadImageHandler(files){
    if (!files.length) return

    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    const asset: any = await this.uploadCategoryImage(
      this.current!._id,
      file.name,
      formData
    )

    if (asset && asset.url) {
      this.updates.image = asset.url
    }
  }

  createCategoryHandler(model){
    return this.createCategory(model)
      .then(ctg => this.updateParent(ctg))
  }

  async deleteImageHandler(url){
    const id = this.current!._id
    await this.deleteCategoryImage(id, url)

    this.updates.image = null
    this.current!.image = null
  }

  updateParent(category: ICategory){
    if (!category.parent) return

    this.removeFromParentChildren()
    const updates: any = {}

    if (this._parent?.children) {
      this._parent!.children.push(category)
      updates.children = this.parentChildrenIds
    }

    updates._id = this._parent!._id

    return this.updateCategory(updates)
  }
}

export const useCategoryService = () => new Service(useCategoryStore())
