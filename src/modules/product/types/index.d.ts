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
  count: number
  unit: string
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
