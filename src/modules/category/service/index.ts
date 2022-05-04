import { state, actions } from '@modules/category/store'
import { useUploadsStore } from '@shared/store/files'
import { categoryModel } from '@modules/category/model/category.model'
// import { Store } from 'vuezone'
//
// class Service {
//   private _store: Store<any, any>
//   private _model: ICategory
//   private _upload: Store
//
//   constructor(store, upload, model){
//     this._model = model
//     this._store = store
//     this._upload = upload
//   }
//
//   createCategory() {
//     return this._store.createCategory(this._model)
//   }
//
//   updateParentCategory(category) {
//     if (category.parent) {
//       const parent = this._store.state.categories!.find(
//         (c) => c._id === category.parent._id
//       )
//     }
//   }
// }

export const useCategoryService = () => {
  const uploadsStore = useUploadsStore()
  const updates = {}

  const createCategory = (category) => {
    return actions.createCategory(category)
  }

  const updateParentCategory = (category) => {
    if (category.parent) {
      const parent = state.categories!.find(
        (c) => c._id === category.parent._id
      )

      updateCategory({
        _id: category.parent._id,
        children: [ ...parent.children, category._id ]
      })
        .then(ctg => console.log(ctg, 'updated'))
    }
  }

  const updateCategory = (updates) => {
    return actions.updateCategory(updates)
  }

  const getAllCategories = () => {
    return actions.getAllCategories()
  }

  const uploadCategoryImage = (files: File[]) => {
    const formData = new FormData()
    const file = files[files.length - 1]

    formData.append('image', file)

    uploadsStore.uploadImage(file.name, formData)
      .then(file => {
        categoryModel.image = file.url
      })
  }

  return {
    updates,
    createCategory,
    updateCategory,
    getAllCategories,
    uploadCategoryImage,
    updateParentCategory
  }
}
