declare interface IAttributeModel {
  key: string
  value: string
  meta?: string
}

declare type IAttribute = IAttributeModel & { _id: string }

declare interface IAttributeState {
  attributes: Maybe<Array<IAttribute>>
}

declare interface IAttributesActions {
  create(attribute: IAttributeModel): Promise<IAttribute>

  read(id?: string): Promise<Array<IAttribute>>

  update(updates: Partial<IAttribute>): Promise<IAttribute>

  delete(id: string): Promise<boolean>
}
