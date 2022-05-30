import { Store } from 'vuezone'
import { useAttributeStore } from '@modules/attribute/store'

class Service {
  private _store: Store
  private _attribute: Maybe<IAttribute>

  constructor(store){
    this._store = store
    this._attribute = null
  }

  setAsCurrent(attribute: IAttribute){
    this._attribute = attribute
  }

  createAttribute(attribute){
    return this._store.create(attribute)
  }
}

export const useAttributeService = () => new Service(useAttributeStore())
