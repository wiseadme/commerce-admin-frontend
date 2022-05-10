import { defineComponent, ref, Ref } from 'vue'
import { TextEditor } from '@shared/components/TextEditor'

export const productCreateModal = defineComponent({
  components: {
    TextEditor
  },
  props: {
    modelValue: Boolean,
    categories: Array
  },
  emits: [
    'send',
    'upload'
  ],

  async setup(){
    const ctgMap: Ref<Map<string, ICategory>> = ref(new Map())

    const toggleCategory = (ctg) => {
      if (ctgMap.value.get(ctg)) {
        ctgMap.value.delete(ctg)
      } else {
        ctgMap.value.set(ctg, ctg)
      }
    }

    return {
      ctgMap,
      toggleCategory
    }
  }
})
