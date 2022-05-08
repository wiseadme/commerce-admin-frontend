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
        xl="4"
        lg="6"
        md="9"
        sm="12"
      >
        <v-card
          class="elevation-3"
          width="100%"
          color="#ffffff"
        >
          <v-card-title>
            <h2>Создание продукта</h2>
          </v-card-title>
          <v-card-content>
            <v-text-field
              v-model="name"
              label="Название"
            />
            <v-text-field
              v-model="price"
              label="Цена"
              type="number"
            />
            <v-select
              label="категории"
              :items="categories"
            />
          </v-card-content>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<style lang="scss"></style>
