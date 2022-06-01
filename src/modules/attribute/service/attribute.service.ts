import { Store } from 'vuezone'
import { useAttributeStore } from '@modules/attribute/store'
import { useEventBus } from '@shared/composables/use-event-bus'

export class Service {
  private _store: Store<IAttributeState, IAttributesActions>
  private _events: ReturnType<typeof useEventBus>

  constructor(store, eventBus){
    this._store = store
    this._events = eventBus

    this.addListeners()
  }

  get attributes(){
    return this._store.state.attributes
  }

  addListeners(){
    this._events.add('get:attributes', this.onGetAttributes.bind(this))
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

  onGetAttributes() {
    if (this.attributes) return this.attributes
    return this.getAttributes()
  }
}

export const useAttributeService = () => new Service(
  useAttributeStore(),
  useEventBus()
)
