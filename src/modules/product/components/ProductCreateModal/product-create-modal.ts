import { defineComponent, ref, toRaw, computed, PropType, watch } from 'vue'
import { TextEditor } from '@shared/components/TextEditor'
import { Maybe } from 'vueland/dist/types/base'
import { clone } from '@shared/helpers'

export const productCreateModal = defineComponent({
  components: {
    TextEditor
  },
  props: {
    modelValue: Boolean,
    isUpdate: Boolean,
    categoryItems: Array,
    name: String,
    url: String,
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
    'update:url',
    'upload:image',
    'create',
    'update'
  ],

  async setup(props, { emit }){
    const ctgMap = ref<Map<string, ICategory>>(new Map())
    const files = ref<Maybe<any>>([])
    const attributesArray = ref<Array<any>>([])

    const attribute = { key: '', value: '' }

    const toggleCategory = (ctg) => {
      if (ctgMap.value.get(ctg._id)) {
        ctgMap.value.delete(ctg._id)
      } else {
        ctgMap.value.set(ctg._id, ctg)
      }

      computedCategories.value = Array.from(toRaw(ctgMap.value).values())
    }

    watch(() => props.modelValue, to => {
      ctgMap.value.clear()
      if (to && props.isUpdate) {
        props.categories?.forEach(ctg => {
          if (!ctgMap.value.get(ctg._id)) toggleCategory(ctg)
        })
      }
    }, { immediate: true })

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

    const computedUrl = computed<string>({
      get(){
        return props.url!
      },
      set(val){
        emit('update:url', val)
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

    const computedAttributes = computed({
      get() {
        return props.attributes
      },
      set(val) {
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
        emit('update:seo', seo)
      }
    })

    const computedSeoDesc = computed<string>({
      get(){
        return props.seo?.description
      },
      set(val){
        const seo = JSON.parse(JSON.stringify(props.seo))
        seo.description = val

        emit('update:seo', seo)
      }
    })

    const computedSeoKeywords = computed<string>({
      get(){
        return props.seo?.keywords
      },
      set(val){
        const seo = JSON.parse(JSON.stringify(props.seo))
        seo.keywords = val

        emit('update:seo', seo)
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
        emit('update:categories', val)
      }
    })


    const onCreate = validate => {
      validate().then(() => emit('create'))
    }

    const onAttributesUpdate = () => {
      computedAttributes.value = attributesArray.value
    }

    const onUpdate = () => emit('update')

    const onSubmit = (validate) => {
      if (props.isUpdate) onUpdate()
      else onCreate(validate)
    }

    const onLoadImage = event => {
      if (!event.length) return
      emit('upload:image', event)
    }

    const addAttribute = () => {
      // attributesArray.value.push(clone(attribute))
      attributesArray.value = [...attributesArray.value, clone(attribute)]
      console.log(attributesArray.value)
      // emit('update:attributes', attributesArray.value)
    }

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
      computedUrl,
      files,
      attributesArray,
      addAttribute,
      toggleCategory,
      onLoadImage,
      onSubmit,
      onAttributesUpdate
    }
  }
})
