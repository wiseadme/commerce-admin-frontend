<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { service } from '@modules/category/service/category.service'
  import { CategoryModel } from '@modules/category/model/category.model'

  import { CreateModal } from '../components/CreateModal'
  import { UpdateModal } from '../components/UpdateModal'

  export default defineComponent({
    components: {
      CreateModal,
      UpdateModal
    },

    async setup(){
      const model = ref<ICategoryModel>(CategoryModel.create())
      const updates = ref<Partial<ICategoryModel>>({})
      const currentItem = ref<Maybe<ICategory>>(null)

      const showCreateModal = ref<boolean>(false)
      const showUpdateModal = ref<boolean>(false)

      const onEdit = (row) => {
        currentItem.value = row
        showUpdateModal.value = true
      }

      const onUploadImage = (files) => {
        service.uploadCategoryImage(
          currentItem.value._id,
          files
        )
          .then((file) => (updates.value.image = file.url))
          .then(() => console.log(updates.value))
      }

      const onSend = () => {
        service.createCategory(model.value)
          .then(() => model.value = CategoryModel.create())
          .then(() => showCreateModal.value = false)
      }

      const onUpdate = (update) => {
        updates.value = { ...update, ...updates.value }
        updates.value._id = currentItem.value._id

        service.updateCategory(updates.value)
          .then(item => currentItem.value = item)
          .then(() => updates.value = {})
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
        showUpdateModal,
        showCreateModal,
        model,
        updates,
        currentItem,
        service,
        onEdit,
        onSend,
        onUpdate,
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
              @click="onEdit(row)"
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
      v-model:title="model.title"
      v-model:url="model.url"
      v-model:image="model.image"
      v-model:seo-title="model.seo.title"
      v-model:seo-description="model.seo.description"
      v-model:seo-keywords="model.seo.keywords"
      v-model:parent="model.parent"
      v-model:order="model.order"
      :categories="service.store.state.categories"
      @send="onSend"
    />
    <update-modal
      v-model="showUpdateModal"
      :item="currentItem"
      :categories="service.store.state.categories"
      @update="onUpdate"
      @upload="onUploadImage"
    />
  </v-layout>
</template>
