import { useAttributeRepository } from '@modules/attribute/repository/attribute.repository'

const attributeRepository = useAttributeRepository()

export const actions = {
  async create(attribute: IAttributeModel){
    try {
      const { data } = await attributeRepository.create(attribute)
      this.state.attributes = data.data
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates: Partial<IAttribute>){
    try {
      const { data } = attributeRepository.update(updates)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
