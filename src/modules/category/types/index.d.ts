type CategorySeo = {
  title: Maybe<string>
  description: Maybe<string>
  keywords: Maybe<string>
}

declare interface ICategory {
  title: string
  url: string
  image: Maybe<string>
  parent: Maybe<string>
  children: Maybe<Array<ICategory>>
  order: number
  seo: CategorySeo
}

declare type ParentCategory = ICategory & { _id: string }

declare interface ICategoryState {
  categories: Maybe<Array<any>>
}

declare interface ICategoryActions {
  createCategory: (category: ICategory) => Promise<any>
  updateCategory: (updates: any) => Promise<any>
  getAllCategories: () => Promise<any>
}

declare interface ICategoryService {

}
