<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { service } from '@modules/category/service/category.service'
  import { categoryModel } from '@modules/category/model/category.model'

  import { CreateModal } from '../components/CreateModal'

  export default defineComponent({
    components: { CreateModal },

    async setup(){
      const showCreateModal = ref<boolean>(false)
      const compRef = ref(null)

      const onUploadImage = (files) => {
        service.uploadCategoryImage(files)
          .then((file) => (categoryModel.image = file.url))
      }

      const onSend = () => {
        service.createCategory(categoryModel)
      }

      const cols = ref([
        {
          key: 'actions',
          title: 'Действия',
          align: 'center'
        },
        {
          key: 'title',
          title: 'Название',
          width: '300',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.title
        },
        {
          key: 'url',
          title: 'Url категории',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.url
        },
        {
          key: 'image',
          title: 'Картинка',
          width: '150',
          resizeable: true,
          sortable: true,
          filterable: true
        },
        {
          key: 'parent',
          title: 'Родительская категория',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.parent?.title
        },
        {
          key: 'seo',
          title: 'SEO',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.title
        },
        {
          key: 'order',
          title: 'Порядковый номер',
          width: '200',
          resizeable: true,
          sortable: true,
          filterable: true
        }
      ])

      await service.getAllCategories()

      return {
        cols,
        compRef,
        showCreateModal,
        service,
        categoryModel,
        onSend,
        onUploadImage
      }
    }
  })
</script>
<template>
  <v-layout column>
    <v-row>
      <v-col
        cols="12"
        class="pa-1"
      >
        <v-data-table
          :cols="cols"
          :rows="service.store.state.categories"
          class="elevation-2"
          :header-options="{
            // color: 'grey darken-3',
            // contentColor: 'white',
          }"
        >
          <template #toolbar>
            <v-button
              color="orange darken-2"
              elevation="3"
              @click="showCreateModal = true"
            >
              <v-icon>fas fa-plus</v-icon>
            </v-button>
          </template>
          <template #actions="{row}">
            <v-button
              color="orange"
              elevation="2"
            >
              <v-icon>fas fa-pen</v-icon>
            </v-button>
            <v-button
              class="ml-1"
              color="red darken-1"
              elevation="2"
              @click="service.deleteCategory(row)"
            >
              <v-icon>fas fa-trash-alt</v-icon>
            </v-button>
          </template>
          <template #image="{ row }">
            <div class="d-flex justify-center align-center">
              <img
                style="height: 30px; width: auto"
                :src="`http://anar.com/${row.image}`"
                :alt="row.title"
              />
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <create-modal
      v-model="showCreateModal"
      v-model:title="categoryModel.title"
      v-model:url="categoryModel.url"
      v-model:image="categoryModel.image"
      v-model:seo-title="categoryModel.seo.title"
      v-model:seo-description="categoryModel.seo.description"
      v-model:seo-keywords="categoryModel.seo.keywords"
      v-model:parent="categoryModel.parent"
      v-model:order="categoryModel.order"
      :categories="service.store.state.categories"
      @send="onSend"
      @upload="onUploadImage"
    />
  </v-layout>
</template>
