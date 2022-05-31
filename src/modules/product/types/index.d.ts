declare interface IProductState {
  products: Array<IProduct>
}

declare interface IProductActions {
  create(product: IProductModel): Promise<IProduct>

  read(id?: string): Promise<Array<IProduct>>

  delete(product): Promise<boolean>

  update(updates: Partial<IProduct>): Promise<IProduct>
}

declare interface IProductAsset {
  _id: string
  url: string,
  type: string,
  main: boolean
}

declare interface IProductAttribute {
  key: string
  value: string
  meta?: string
}

declare interface IProductVariant {
  group: string
  product: string
  options: Array<any>
}

declare interface IProductModel {
  name: string
  price: number
  count: number
  unit: string
  url: string
  description: string
  isVisible?: boolean
  categories: Array<ICategory>
  image: Maybe<IProductAsset>
  assets: Maybe<Array<IProductAsset>>
  attributes: Maybe<Array<IAttribute>>
  variants: Maybe<Array<IProductVariant>>
  seo?: {
    title?: string
    description?: string
    keywords?: string
  },
}

declare type IProduct = IProductModel & { _id: string }
