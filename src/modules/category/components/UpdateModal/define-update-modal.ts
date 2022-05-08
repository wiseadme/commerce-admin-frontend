import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { Maybe } from 'vueland/dist/types/base'

export const defineUpdateModal = defineComponent({
  name: 'update-modal',
  props: {
    modelValue: Boolean,
    categories: {
      type: Array,
      default: null
    },
    updates: Object,
    item: Object as PropType<ICategory>
  },

  emits: [
    'update',
    'update:modelValue',
    'upload:image',
    'delete:image'
  ],

  setup(props, { emit }){
    const parent = ref<Maybe<ICategory>>(null)
    const updates = ref<Partial<ICategoryModel>>({})
    const files = ref<Maybe<any>>([])

    watch(files, to => console.log(to))

    const onUpdate = (validate) => {
      validate()
        .then(() => emit('update', updates.value))
        .then(() => {
          updates.value = {}
          files.value = []
        })
    }

    const onDeleteImage = () => {
      const id = props.item!._id
      const url = props.item?.image

      emit('delete:image', { id, url })
    }

    const onLoadImage = event => {
      if (!event.length) return
      emit('upload:image', event)
    }

    const computedTitleProp = computed<string | undefined>({
      get(){
        return updates.value?.title || props.item?.title
      },
      set(val){
        updates.value.title = val
      }
    })

    const computedUrlProp = computed<string | undefined>({
      get(){
        return updates.value?.url || props.item?.url
      },
      set(val){
        updates.value.url = val
      }
    })

    const computedSeoTitleProp = computed<string | undefined>({
      get(){
        return updates.value?.seo?.title || props.item?.seo.title!
      },
      set(val){
        if (!updates.value.seo) updates.value.seo = props.item!.seo
        updates.value.seo.title = val
      }
    })

    const computedSeoDescProp = computed<string | undefined>({
      get(){
        return updates.value?.seo?.description || props.item?.seo.description!
      },
      set(val){
        if (!updates.value.seo) updates.value.seo = props.item!.seo
        updates.value.seo!.description = val
      }
    })

    const computedSeoKeywordsProp = computed<string | undefined>({
      get(){
        return updates.value?.seo?.keywords || props.item?.seo.keywords!
      },
      set(val){
        if (!updates.value.seo) updates.value.seo = props.item!.seo
        updates.value.seo.keywords = val
      }
    })

    const computedOrderProp = computed<number | undefined>({
      get(){
        return updates.value?.order || props.item?.order
      },
      set(val){
        updates.value.order = val
      }
    })

    const computedParentProp = computed<Maybe<ICategory>>({
      get(){
        return parent.value
      },
      set(val: ICategory){
        parent.value = val
        updates.value.parent = parent.value._id
      }
    })

    return {
      onUpdate,
      onLoadImage,
      onDeleteImage,
      files,
      computedParentProp,
      computedTitleProp,
      computedUrlProp,
      computedSeoTitleProp,
      computedSeoDescProp,
      computedSeoKeywordsProp,
      computedOrderProp
    }
  }
})
