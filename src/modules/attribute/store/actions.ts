import { useAttributeRepository } from '@modules/attribute/repository/attribute.repository'

const attributeRepository = useAttributeRepository()

export const actions: IAttributesActions = {
  async create(attribute: IAttributeModel){
    try {
      const { data } = await attributeRepository.create(attribute)
      this.state.attributes.push(data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(id?: string){
    try {
      const { data } = await attributeRepository.read(id)
      this.state.attributes = data.data.sort((a, b) => a.order - b.order)
      return this.state.attributes
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates: Array<IAttribute>){
    try {
      const { data } = await attributeRepository.update(updates)
      const map: { [key: string]: IAttribute } = {}

      this.state.attributes.concat(data.data).forEach(it => map[it._id] = it)

      this.state.attributes = Object.values(map).sort(
        (a, b) => a.order - b.order
      )

      return this.state.attributes
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(id: string){
    try {
      const { data } = await attributeRepository.delete(id)
      this.state.attributes = this.state.attributes.filter(it => it._id !== id)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
