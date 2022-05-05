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

declare type ICategory = ICategoryModel & { _id: string }

declare interface ICategoryState {
  categories: Maybe<Array<any>>
}

declare interface ICategoryActions {
  createCategory: (category: ICategoryModel) => Promise<any>
  updateCategory: (updates: any) => Promise<any>
  getAllCategories: () => Promise<any>
}

declare interface ICategoryService {
  createCategory: (category: ICategoryModel) => Promise<ICategoryModel & { _id: string }>
}
