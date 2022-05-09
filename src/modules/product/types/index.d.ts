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
  name: string,
  price: number,
  categories: Array<ICategory>,
  image?: IProductAsset,
  seo?: {
    title?: string,
    description?: string,
    keywords?: string
  },
  assets?: Array<IProductAsset>,
  attributes?: Array<IProductAttribute>,
  variants?: Array<IProductVariant>
}
