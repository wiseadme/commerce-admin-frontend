type CategorySeo = {
  title?: Maybe<string>
  description?: Maybe<string>
  keywords?: Maybe<string>
}

declare interface ICategoryModel {
  title: string
  url: string
  image: Maybe<string>
  parent: Maybe<string>
  children: Maybe<Array<ICategory>>
  order: number
  seo: CategorySeo
}

declare type ICategory = {
  _id: string
  title: string
  url: string
  image: Maybe<string>
  parent: ICategory
  children: Array<ICategory>
  order: number
  seo: CategorySeo
}

declare interface ICategoryUpdates {
  _id: string
  title?: string
  url?: string
  image?: Maybe<string>
  parent?: ICategory['_id']
  children?: Array<string>
  order?: number
  seo?: CategorySeo
}

declare interface ICategoryState {
  categories: Maybe<Array<ICategory>>
  category: Maybe<ICategory>
}

declare interface ICategoryActions {
  create(category: ICategoryModel): Promise<ICategory>

  update(updates: Partial<ICategoryUpdates>): Promise<ICategory>

  read(id?: string): Promise<Array<ICategory>>

  delete(category: ICategory): Promise<boolean>

  uploadImage(id: string, fileName: string, data: FormData): Promise<{ url: string }>

  deleteImage(id: string, fileName: string): Promise<boolean>
}

declare interface ICategoryService {
  createCategory(category: ICategoryModel): void

  // updateParent: (category: ICategory) => Promise<ICategory> | undefined
}
