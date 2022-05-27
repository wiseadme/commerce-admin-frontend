declare interface IProductState {
  products: Array<IProduct>
}

declare interface IProductActions {
  create: (product: IProductModel) => Promise<IProduct>
  read: (id?: string) => Promise<Array<IProduct>>
  delete: (product) => Promise<{ data: boolean, ok: boolean }>
}

declare interface IProductAsset {
  url: string,
  type: string
}

declare interface IProductAttribute {
  key: string
  value: any
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
  attributes: Maybe<Array<IProductAttribute>>
  variants: Maybe<Array<IProductVariant>>
  seo?: {
    title?: string
    description?: string
    keywords?: string
  },
}

declare interface IProduct {
  _id: string
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
  attributes: Maybe<Array<IProductAttribute>>
  variants: Maybe<Array<IProductVariant>>
  seo?: {
    title?: string
    description?: string
    keywords?: string
  },
}
