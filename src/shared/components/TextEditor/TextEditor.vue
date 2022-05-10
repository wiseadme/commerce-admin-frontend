<script lang="ts">
  import { textEditor } from './text-editor'

  export default textEditor
</script>
<template>
  <quill-editor
    v-model:content="content"
    :toolbar="toolbar"
    content-type="html"
    theme="snow"
    @text-change="onShow"
  />
</template>
<style lang="scss">
  @import "@vueup/vue-quill/dist/vue-quill.snow.css";

  .ql-editor {
    min-height: 200px;
  }
</style>
