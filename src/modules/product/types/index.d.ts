interface IProductAsset {
  url: string,
  type: string
}

interface IProductAttribute {
  key: string
  value: any
}

interface IProductVariant {
  group: string
  product: string
  options: Array<any>
}

declare interface IProductModel {
  name: string
  price: number
  description: string
  categories: Array<ICategory>
  image: Maybe<IProductAsset>
  seo?: {
    title?: string
    description?: string
    keywords?: string
  },
  assets: Maybe<Array<IProductAsset>>
  attributes: Maybe<Array<IProductAttribute>>
  variants: Maybe<Array<IProductVariant>>
}
