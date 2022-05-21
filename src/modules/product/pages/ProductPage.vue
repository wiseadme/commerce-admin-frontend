<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { ProductCreateModal } from '../components/ProductCreateModal'
  import { useCategoryService } from '@modules/category/service/category.service'
  import { ProductModel } from '@modules/product/model/product.model'

  export default defineComponent({
    components: { ProductCreateModal },

    async setup(){
      const model = ref<IProductModel>(ProductModel.create())
      const showCreateModal = ref(false)

      const categoryService = useCategoryService()

      watch(() => model.value, to => console.log(to), { immediate: true, deep: true })

      if (!categoryService.categories) {
        await categoryService.getCategories()
      }

      return {
        model,
        categoryService,
        showCreateModal
      }
    }
  })
</script>
<template>
  <v-layout column>
    <v-row>
      <v-col
        cols="12"
      >
        <v-data-table
          class="elevation-2"
          :header-options="{
            color: 'green',
            contentColor: '#ffffff',
            resizerColor: '#ffffff'
          }"
          :footer-options="{
            color: '#272727',
            contentColor: '#ffffff',
            counts: {
              displayColor: 'green',
              rowsPerPageText: 'кол-во строк'
            },
            pagination: {
              buttonsColor: 'green',
              displayColor: 'green'
            }
          }"
        >
          <template #toolbar>
            <v-toolbar color="#272727">
              <v-toolbar-logo></v-toolbar-logo>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-button
                  color="green"
                  elevation="5"
                  outlined
                  @click="showCreateModal = true"
                >
                  <v-icon
                    size="14"
                    color="green"
                    sm
                  >
                    fas fa-plus
                  </v-icon>
                </v-button>
              </v-toolbar-items>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <product-create-modal
      v-model="showCreateModal"
      v-model:name="model.name"
      v-model:price="model.price"
      v-model:count="model.count"
      v-model:unit="model.unit"
      v-model:description="model.description"
      v-model:categories="model.categories"
      v-model:seo="model.seo"
      v-model:attributes="model.attributes"
      v-model:variants="model.variants"
      v-model:is-visible="model.isVisible"
      :category-items="categoryService.categories"
    />
  </v-layout>
</template>
