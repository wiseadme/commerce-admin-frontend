import { defineComponent, ref, watch, computed, PropType } from 'vue'
import { Maybe } from 'vueland/dist/types/base'

export const categoryActionsModal = defineComponent({
  props: {
    modelValue: Boolean,
    isUpdate: Boolean,
    title: String,
    url: String,
    image: String,
    parent: Object as PropType<ICategory>,
    order: Number,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String,
    categories: {
      type: Array,
      default: null
    }
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
    'delete:image',
    'upload:image',
    'update',
    'send',
    'upload'
  ],

  setup(props, { emit }){
    const parent = ref<Maybe<ICategory>>(null)
    const updates = ref<Partial<ICategoryModel>>({})
    const files = ref<Maybe<any>>([])

    const computedTitleProp = computed<string | undefined>({
      get(){
        return props.title
      },
      set(val){
        if (props.isUpdate) updates.value.title = val
        emit('update:title', val)
      }
    })

    const computedUrlProp = computed<string | undefined>({
      get(){
        return props.url
      },
      set(val){
        if (props.isUpdate) updates.value.url = val
        emit('update:url', val)
      }
    })

    const computedImageProp = computed<string | undefined>({
      get(){
        return props.image
      },
      set(val){
        if (props.isUpdate) updates.value.image = val
        emit('update:image', val)
      }
    })

    const computedSeoTitleProp = computed<string | undefined>({
      get(){
        return props.seoTitle
      },
      set(val){
        if (props.isUpdate) updates.value.seo!.title = val
        emit('update:seoTitle', val)
      }
    })

    const computedSeoDescProp = computed<string | undefined>({
      get(){
        return props.seoDescription
      },
      set(val){
        if (props.isUpdate) updates.value.seo!.description = val
        emit('update:seoDescription', val)
      }
    })

    const computedSeoKeywordsProp = computed<string | undefined>({
      get(){
        return props.seoKeywords
      },
      set(val){
        if (props.isUpdate) updates.value.seo!.keywords = val
        emit('update:seoKeywords', val)
      }
    })

    const computedOrderProp = computed<number | undefined>({
      get(){
        return props.order
      },
      set(val){
        if (props.isUpdate) updates.value.order = val
        emit('update:order', val)
      }
    })

    const computedParentProp = computed<Maybe<ICategory>>({
      get(){
        return props.parent ?  parent.value : null
      },
      set(val: ICategory){
        parent.value = val
        if (props.isUpdate) updates.value.parent = val
        emit('update:parent', val)
      }
    })

    watch(() => props.parent, (to: ICategory) => {
      !!to && (parent.value = to)
    }, { immediate: true })

    const onSend = (validate) => {
      validate()
        .then(() => emit('send'))
        .then(() => parent.value = null)
    }

    const onUpdate = (validate) => {
      validate()
        .then(() => emit('update', updates.value))
        .then(() => {
          updates.value = {}
          parent.value = null
          files.value = []
        })
    }

    const onSubmit = validate => {
      if (props.isUpdate) onUpdate(validate)
      if (!props.isUpdate) onSend(validate)
    }

    const onDeleteImage = () => {
      emit('delete:image', computedImageProp.value)
    }

    const onLoadImage = event => {
      if (!event.length) return
      emit('upload:image', event)
    }

    return {
      onSend,
      onLoadImage,
      onDeleteImage,
      onUpdate,
      onSubmit,
      updates,
      files,
      computedParentProp,
      computedTitleProp,
      computedImageProp,
      computedUrlProp,
      computedSeoTitleProp,
      computedSeoDescProp,
      computedSeoKeywordsProp,
      computedOrderProp
    }
  }
})
