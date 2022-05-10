import { ref, Ref } from 'vue'
import { useCategoryStore } from '@modules/category/store'
import { Store } from 'vuezone'

class Service implements ICategoryService {
  private _store: Store<ICategoryState, ICategoryActions>
  private _updates: Ref<Partial<ICategory>>
  private _current: Ref<Maybe<ICategory>>

  constructor(store){
    this._store = store
    this._current = ref(null)
    this._updates = ref({})
  }

  get current(){
    return this._current.value
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

  setAsCurrent(row: Maybe<ICategory>){
    this._current.value = row
  }

  getParent(category) {
    return this.categories!.find(
      (c) => c._id === category.parent!._id
    )
  }

  async updateOldParent(){
    const parent = this.getParent(this._current.value)

    const children = parent?.children.filter(
      it => it._id !== this._current.value!._id
    )

    const update = {
      _id: parent?._id,
      children: children?.map(c => c._id)
    }

    await this.updateCategory(update as any)
  }

  async deleteCategoryHandler(category){
    await this.deleteCategory(category)

    const parent = this.getParent(category)

    const updates = {
      _id: parent!._id,
      children: parent!.children.filter(it => it._id !== category._id)
    }

    return this.updateCategory(updates)
  }

  async updateHandler(update: Partial<ICategoryModel>){
    this._updates.value = Object.assign({}, update, this._updates.value)

    if (!Object.keys(this._updates.value).length) return

    this._updates.value._id = this._current.value!._id

    await this.updateCategory(this._updates.value)
      .then(async (ctg) => {
        if (update.parent) await this.updateOldParent()

        this._current.value = ctg
        this._updates.value = {}
      })
      .then(() => {
        this.updateParentChildren(this._current.value!)
      })

    return this.current
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

  async deleteImageHandler(url){
    const id = this._current.value!._id
    await this.deleteCategoryImage(id, url)

    this._updates.value.image = null
    this._current.value!.image = null
  }

  updateParentChildren(category: ICategory){
    if (!category.parent) return

    const parent = this.getParent(category)

    parent!.children = parent!.children.filter(
      it => it._id !== category._id
    )

    parent!.children.push(category)

    const updates = {
      _id: parent!._id,
      children: parent!.children
    }

    return this.updateCategory(updates)
  }
}

export const useCategoryService = () => new Service(useCategoryStore())
