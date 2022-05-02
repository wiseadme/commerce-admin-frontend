<script lang="ts">
  import { defineComponent, toRefs } from 'vue'
  import { useCategoryService } from '@modules/category/service'
  import { categoryStore } from '@modules/category/store'

  export default defineComponent({
    setup(){
      const { category, createCategory, getAllCategories } = useCategoryService()

      const onSend = (validate) => {
        validate()
          .then(() => createCategory())
          .catch(err => console.log(err))
      }

      getAllCategories()

      return {
        ...toRefs(category),
        onSend,
        categoryStore
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
        md="6"
        sm="12"
      >
        <v-form v-slot="{validate}">
          <v-card
            class="elevation-3"
            width="100%"
          >
            <v-card-title>
              Создание категории
            </v-card-title>
            <v-card-content>
              <v-text-field
                v-model="title"
                label="название"
                :rules="[val => !!val || 'Required']"
              />
              <v-text-field
                v-model="url"
                label="url категории"
                :rules="[val => !!val || 'Required']"
              />
              <v-text-field
                v-model="seo.title"
                label="seo title"
                :rules="[val => !!val || 'Required']"
              />
              <v-text-field
                v-model="seo.description"
                label="seo description"
                :rules="[val => !!val || 'Required']"
              />
              <v-text-field
                v-model="seo.keywords"
                label="seo keywords"
                :rules="[val => !!val || 'Required']"
              />
              <v-select
                label="Родительская категория"
                :items="categoryStore.state.categories"
                value-key="title"
              />
              <v-file-input
                label="загрузите изображения"
              />
            </v-card-content>
            <v-card-actions>
              <v-button
                color="primary"
                @click="onSend(validate)"
              >
                Создать
              </v-button>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-layout>
</template>
