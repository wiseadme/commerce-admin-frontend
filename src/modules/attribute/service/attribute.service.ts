import { Store } from 'vuezone'
import { useAttributeStore } from '@modules/attribute/store'

class Service {
  private _store: Store<IAttributeState, IAttributesActions>
  private _attribute: Maybe<IAttribute>

  constructor(store){
    this._store = store
    this._attribute = null
  }

  get attributes(){
    return this._store.state.attributes
  }

  setAsCurrent(attribute: IAttribute){
    this._attribute = attribute
  }

  createAttribute(attribute){
    return this._store.create(attribute)
  }

  deleteAttribute(id){
    return this._store.delete(id)
  }

  getAttributes(){
    return this._store.read().catch(err => console.log(err))
  }
}

export const useAttributeService = () => new Service(useAttributeStore())
