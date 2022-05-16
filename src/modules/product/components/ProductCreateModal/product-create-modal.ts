import { defineComponent, ref, watch, computed } from 'vue'
import { TextEditor } from '@shared/components/TextEditor'

export const productCreateModal = defineComponent({
  components: {
    TextEditor
  },
  props: {
    modelValue: Boolean,
    categoryItems: Array,
    name: String,
    description: String,
    price: Number,
    categories: Array,
    image: String,
    seo: Object,
    attributes: Array,
    variants: Array,
    assets: Array
  },
  emits: [
    'update:modelValue',
    'update:name',
    'update:price',
    'update:description',
    'update:image',
    'update:assets',
    'update:attributes',
    'update:variants',
    'update:seo',
    'update:categories',
    'send',
    'upload'
  ],

  async setup(props, { emit }){
    const ctgMap = ref<Map<string, ICategory>>(new Map())
    const htmlContent = ref('<h1>salam</h1>')

    watch(htmlContent, to => console.log(to))

    const toggleCategory = (ctg) => {
      if (ctgMap.value.get(ctg)) {
        ctgMap.value.delete(ctg)
      } else {
        ctgMap.value.set(ctg, ctg)
      }
    }

    const computedName = computed<string>({
      get(){
        return props.name!
      },
      set(val){
        emit('update:name', val)
      }
    })

    const computedPrice = computed<number>({
      get(){
        return props.price!
      },
      set(val){
        emit('update:price', val)
      }
    })

    const computedCategories = computed({
      get(){
        return props.categories
      },
      set(val){
        toggleCategory(val)
        emit('update:categories', Array.from(ctgMap.value.values()))
      }
    })

    return {
      ctgMap,
      computedName,
      computedPrice,
      computedCategories,
      htmlContent,
      toggleCategory
    }
  }
})
