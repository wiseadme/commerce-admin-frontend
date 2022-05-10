import { defineComponent, ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'

export const textEditor = defineComponent({
  name: 'product-text-editor',
  components: { QuillEditor },
  setup(){
    const content = ref<string>('')

    const toolbar = [
      [ 'bold', 'italic', 'underline', 'strike' ],
      [ 'blockquote', 'code-block' ],

      [ { 'header': 1 }, { 'header': 2 } ],
      [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
      [ { 'script': 'sub' }, { 'script': 'super' } ],
      [ { 'indent': '-1' }, { 'indent': '+1' } ],
      [ { 'direction': 'rtl' } ],

      [ { 'size': [ 'small', 'middle', 'large', 'huge' ] } ],
      [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],

      [ { 'color': [] }, { 'background': [] } ],
      // [ { 'font': [] } ],
      [ { 'align': [] } ],

      [ 'clean' ],
      // [ 'link', 'image', 'video' ]
    ]

    const onShow = () => {
      console.log(content.value)
    }

    return {
      content,
      toolbar,
      onShow
    }
  }
})
