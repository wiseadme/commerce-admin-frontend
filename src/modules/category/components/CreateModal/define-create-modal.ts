import { defineComponent, toRefs, ref, computed } from 'vue'
import { state } from '@modules/category/store'
import { categoryModel } from '@modules/category/model/category.model'

export const defineCreateModal = () => defineComponent({
  props: {
    modelValue: Boolean
  },
  emits: [ 'update:modelValue', 'send', 'upload' ],
  async setup(_, { emit }){
    let parent = ref<Maybe<ParentCategory>>(null)

    const onSend = async (validate) => {
      validate().then(() => emit('send', categoryModel))
    }


    const computedParentId = computed({
      get(){
        return parent.value
      },
      set(val: ParentCategory){
        parent.value = val
        categoryModel.parent = parent.value._id
      }
    })

    return {
      ...toRefs(categoryModel),
      state,
      onSend,
      computedParentId
    }
  }
})
