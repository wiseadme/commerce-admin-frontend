import { Store } from 'vuezone'
import { useAttributeStore } from '@modules/attribute/store'

class Service {
  private _store: Store<IAttributeState, IAttributesActions>

  constructor(store){
    this._store = store
  }

  get attributes(){
    return this._store.state.attributes
  }

  updateAttribute(updates){
    return this._store.update(updates)
      .then(res => console.log(res))
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
