import { defineComponent, ref, computed } from 'vue'

export const defineCreateModal = defineComponent({
  props: {
    modelValue: Boolean,
    categories: Array,
    title: String,
    url: String,
    image: String,
    parent: String,
    order: Number,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String,
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
    'upload',
  ],

  async setup(props, { emit }) {
    const parent = ref<Maybe<ParentCategory>>(null)

    const onSend = (validate) => {
      validate().then(() => emit('send'))
    }

    const computedTitleProp = computed<string | undefined>({
      get() {
        return props.title
      },
      set(val) {
        emit('update:title', val)
      },
    })

    const computedUrlProp = computed<string | undefined>({
      get() {
        return props.url
      },
      set(val) {
        emit('update:url', val)
      },
    })

    const computedSeoTitleProp = computed<string | undefined>({
      get() {
        return props.seoTitle
      },
      set(val) {
        emit('update:seoTitle', val)
      },
    })

    const computedSeoDescProp = computed<string | undefined>({
      get() {
        return props.seoDescription
      },
      set(val) {
        emit('update:seoDescription', val)
      },
    })

    const computedSeoKeywordsProp = computed<string | undefined>({
      get() {
        return props.seoKeywords
      },
      set(val) {
        emit('update:seoKeywords', val)
      },
    })

    const computedOrderProp = computed<number | undefined>({
      get() {
        return props.order
      },
      set(val) {
        emit('update:order', val)
      },
    })

    const computedParentProp = computed<Maybe<ParentCategory>>({
      get() {
        return parent.value
      },
      set(val: ParentCategory) {
        parent.value = val
        emit('update:parent', parent.value._id)
      },
    })

    return {
      onSend,
      computedParentProp,
      computedTitleProp,
      computedUrlProp,
      computedSeoTitleProp,
      computedSeoDescProp,
      computedSeoKeywordsProp,
      computedOrderProp,
    }
  },
})
