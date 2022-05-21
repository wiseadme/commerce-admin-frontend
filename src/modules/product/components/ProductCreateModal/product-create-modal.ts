import { defineComponent, ref, toRaw, computed, PropType } from 'vue'
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
    count: Number,
    unit: String,
    isVisible: Boolean,
    image: String,
    seo: Object,
    categories: Array as PropType<Array<ICategory>>,
    attributes: Array as PropType<Array<IProductAttribute>>,
    variants: Array as PropType<Array<IProductVariant>>,
    assets: Array as PropType<Array<IProductAsset>>
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
    'update:count',
    'update:unit',
    'update:isVisible',
    'update:seo:title',
    'update:seo:description',
    'update:seo:keywords',
    'send',
    'upload'
  ],

  async setup(props, { emit }){
    const ctgMap = ref<Map<string, ICategory>>(new Map())

    const toggleCategory = (ctg) => {
      if (ctgMap.value.get(ctg)) {
        ctgMap.value.delete(ctg)
      } else {
        ctgMap.value.set(ctg, ctg)
      }

      computedCategories.value = Array.from(toRaw(ctgMap.value).values())
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
        emit('update:price', +val)
      }
    })

    const computedDescription = computed<string>({
      get(){
        return props.description!
      },
      set(val){
        emit('update:description', val)
      }
    })

    const computedCount = computed<number>({
      get(){
        return props.count!
      },
      set(val){
        emit('update:count', +val)
      }
    })

    const computedUnit = computed<string>({
      get(){
        return props.unit!
      },
      set(val){
        emit('update:unit', val)
      }
    })

    const computedImage = computed<string>({
      get(){
        return props.image!
      },
      set(val){
        emit('update:image', val)
      }
    })

    const computedAssets = computed<Array<IProductAsset>>({
      get(){
        return props.assets!
      },
      set(val){
        emit('update:assets', val)
      }
    })

    const computedAttributes = computed<Array<IProductAttribute>>({
      get(){
        return props.attributes!
      },
      set(val){
        emit('update:attributes', val)
      }
    })

    const computedVariants = computed<Array<IProductVariant>>({
      get(){
        return props.variants!
      },
      set(val){
        emit('update:variants', val)
      }
    })

    const computedSeoTitle = computed<string>({
      get(){
        return props.seo?.title
      },
      set(val){
        const seo = JSON.parse(JSON.stringify(props.seo))
        seo.title = val
        emit('update:seo:title', seo)
      }
    })

    const computedSeoDesc = computed<string>({
      get(){
        return props.seo?.description
      },
      set(val){
        const seo = JSON.parse(JSON.stringify(props.seo))
        seo.description = val

        emit('update:seo:description', seo)
      }
    })

    const computedSeoKeywords = computed<string>({
      get(){
        return props.seo?.keywords
      },
      set(val){
        const seo = JSON.parse(JSON.stringify(props.seo))
        seo.keywords = val

        emit('update:seo:keywords', seo)
      }
    })

    const computedVisibility = computed<boolean>({
      get(){
        return props.isVisible
      },
      set(val){
        emit('update:isVisible', val)
      }
    })

    const computedCategories = computed<Array<ICategory>>({
      get(){
        return props.categories!
      },
      set(val){
        // toggleCategory(val)
        emit('update:categories', val)
      }
    })

    return {
      ctgMap,
      computedVisibility,
      computedName,
      computedPrice,
      computedCount,
      computedUnit,
      computedImage,
      computedSeoTitle,
      computedSeoDesc,
      computedSeoKeywords,
      computedAssets,
      computedAttributes,
      computedVariants,
      computedCategories,
      computedDescription,
      toggleCategory
    }
  }
})
