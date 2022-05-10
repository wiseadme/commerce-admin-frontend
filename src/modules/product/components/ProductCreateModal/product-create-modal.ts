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
    'update:modelValue',
    'update:title',
    'update:url',
    'update:image',
    'update:parent',
    'update:order',
    'update:seoTitle',
    'update:seoDescription',
    'update:seoKeywords',
    'send',
    'upload'
  ],

  async setup(){
    const ctgMap: Ref<Map<string, ICategory>> = ref(new Map())

    const toggleCategory = (ctg) => {
      if (ctgMap.value.get(ctg._id)) {
        ctgMap.value.delete(ctg._id)
      } else {
        ctgMap.value.set(ctg._id, ctg)
      }
    }

    return {
      ctgMap,
      toggleCategory
    }
  }
})
