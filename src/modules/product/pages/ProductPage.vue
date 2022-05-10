<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { ProductCreateModal } from '../components/ProductCreateModal'
  import { useCategoryService } from '@modules/category/service/category.service'

  export default defineComponent({
    components: { ProductCreateModal },

    async setup(){
      const showCreateModal = ref(false)
      const categoryService = useCategoryService()

      if (!categoryService.categories) {
        await categoryService.getAllCategories()
      }

      return {
        categoryService,
        showCreateModal
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
        <v-data-table
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
      :categories="categoryService.categories"
    />
  </v-layout>
</template>
