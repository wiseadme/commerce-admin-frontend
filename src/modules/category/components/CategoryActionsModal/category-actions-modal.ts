import { defineComponent, ref, watch, computed, PropType } from 'vue'
import { Maybe } from 'vueland/dist/types/base'

export const categoryActionsModal = defineComponent({
  props: {
    modelValue: Boolean,
    isUpdate: Boolean,
    title: String,
    url: String,
    image: String,
    parent: [Object, String] as PropType<ICategory | string>,
    order: Number,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String,
    categories: {
      type: Array as PropType<Array<ICategory>>,
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
    'create',
    'upload'
  ],

  setup(props, { emit }){
    const updates = ref<Partial<ICategoryUpdates>>({})
    const files = ref<Maybe<any>>([])

    updates.value.seo = {}

    const computedTitleProp = computed<string | undefined>({
      get(){
        return props.title
      },
      set(val){
        if (props.isUpdate) return updates.value.title = val
        return emit('update:title', val)
      }
    })

    const computedUrlProp = computed<string | undefined>({
      get(){
        return props.url
      },
      set(val){
        if (props.isUpdate) return updates.value.url = val
        return emit('update:url', val)
      }
    })

    const computedImageProp = computed<string | undefined>({
      get(){
        return props.image
      },
      set(val){
        if (props.isUpdate) return updates.value.image = val
        return emit('update:image', val)
      }
    })

    const computedSeoTitleProp = computed<string | undefined>({
      get(){
        return props.seoTitle
      },
      set(val){
        if (props.isUpdate) return updates.value.seo!.title = val
        return emit('update:seoTitle', val)
      }
    })

    const computedSeoDescProp = computed<string | undefined>({
      get(){
        return props.seoDescription
      },
      set(val){
        if (props.isUpdate) return updates.value.seo!.description = val
        return emit('update:seoDescription', val)
      }
    })

    const computedSeoKeywordsProp = computed<string | undefined>({
      get(){
        return props.seoKeywords
      },
      set(val){
        if (props.isUpdate) return updates.value.seo!.keywords = val
        return emit('update:seoKeywords', val)
      }
    })

    const computedOrderProp = computed<number | undefined>({
      get(){
        return props.order
      },
      set(val){
        if (props.isUpdate) return updates.value.order = val
        return emit('update:order', val)
      }
    })

    const computedParentProp = computed<Maybe<ICategory>>({
      get(){
        const id = props.parent
        return props.parent ? props.categories.find(it => it._id === id)! : null
      },
      set(val: ICategory){
        if (props.isUpdate) return updates.value.parent = val._id
        return emit('update:parent', val._id)
      }
    })

    watch(() => props.image, () => files.value = [])

    const onSend = (validate) => {
      validate().then(() => emit('create'))
    }

    const onUpdate = (validate) => {
      validate()
        .then(() => emit('update', updates.value))
        .then(() => {
          updates.value = {}
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
