declare interface IAttributeModel {
  key: string
  value: string
  meta?: string
}

declare type IAttribute = IAttributeModel & { _id: string }
