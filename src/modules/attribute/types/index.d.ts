declare interface IAttributeModel {
  key: string
  value: string
  meta?: string,
  order: number
}

declare type IAttribute = IAttributeModel & { _id: string }

declare interface IAttributeState {
  attributes: Maybe<Array<IAttribute>>
}

declare interface IAttributesActions {
  create(attribute: IAttributeModel): Promise<IAttribute>

  read(id?: string): Promise<Array<IAttribute>>

  update(updates: Array<IAttribute>): Promise<Array<IAttribute>>

  delete(id: string): Promise<boolean>
}
