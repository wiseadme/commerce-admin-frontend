<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import { useProductService } from '../composables/use-product-service'

export default defineComponent({
  async setup() {
    const product = reactive({
      name: null,
      price: 0,
      categories: [],
      image: null,
      seo: {
        title: null,
        description: null,
        keywords: null
      },
      attributes: [],
      assets: [],
      variants: []
    })

    const service = useProductService()

    return {
      ...toRefs(product),
      service
    }
  }
})
</script>
<template>
  <v-layout column>
    <v-row class="pa-1">
      <v-col
        cols="12"
      >
        <v-data-table></v-data-table>
      </v-col>
    </v-row>
  </v-layout>
</template>
<style lang="scss"></style>
