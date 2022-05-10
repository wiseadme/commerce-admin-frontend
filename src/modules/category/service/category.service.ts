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

  async updateOldParent(){
    const oldParentId = this._current.value?.parent._id
    const parent = this.categories!.find(c => c._id === oldParentId)

    const children = parent?.children.filter(
      it => it._id !== this._current.value!._id
    )

    const update = {
      _id: parent?._id,
      children: children?.map(c => c._id)
    }

    await this.updateCategory(update as any)
  }

  updateHandler(update: Partial<ICategoryModel>){
    this._updates.value = Object.assign({}, update, this._updates.value)

    if (!Object.keys(this._updates.value).length) return

    this._updates.value._id = this._current.value!._id

    this.updateCategory(this._updates.value)
      .then(async (ctg) => {
        if (update.parent) await this.updateOldParent()
        this._current.value = ctg
        this._updates.value = {}
      })
      .then(() => {
        this.updateParentCategory(this._current.value!)
      })
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

  async deleteImageHandler(id, url){
    await this.deleteCategoryImage(id, url)

    this._updates.value.image = null
    this._current.value!.image = null
  }

  setAsCurrent(row: ICategory){
    this._current.value = row
  }

  updateParentCategory(category: ICategory){
    if (!category.parent) return

    const parent = this.categories!.find(
      (c) => c._id === category.parent!._id
    )

    parent!.children?.push(category)

    const updates = {
      _id: category.parent._id,
      children: parent!.children
    }

    return this.updateCategory(updates)
  }
}

export const useCategoryService = () => new Service(useCategoryStore())
