type CategorySeo = {
  title: Maybe<string>
  description: Maybe<string>
  keywords: Maybe<string>
}

declare interface ICategoryModel {
  title: string
  url: string
  image: Maybe<string>
  parent: Maybe<string>
  children: Maybe<Array<ICategoryModel>>
  order: number
  seo: CategorySeo
}

declare type ICategory = {
  _id: string
  title: string
  url: string
  image: string
  parent: ICategory
  children: Array<ICategory>
  order: number
  seo: CategorySeo
}

declare interface ICategoryState {
  categories: Maybe<Array<ICategory>>
}

declare interface ICategoryActions {
  createCategory: (category: ICategoryModel) => Promise<ICategory>
  updateCategory: (updates: Partial<ICategory>) => Promise<ICategory>
  getCategories: (id?: string) => Promise<Array<ICategory>>
  deleteCategory: (category: ICategory) => Promise<boolean>
  uploadCategoryImage: (fileName: string, data: FormData) => Promise<{ url: string }>
  deleteCategoryImage: (fileName: string) => Promise<boolean>
}

declare interface ICategoryService {
  createCategory: (category: ICategoryModel) => void
  updateParentCategory: (category: ICategory) => Promise<ICategory> | undefined
}
