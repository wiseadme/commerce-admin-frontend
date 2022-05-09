<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { service } from '@modules/category/service/category.service'
  import { CategoryModel } from '@modules/category/model/category.model'

  import { CategoryCreateModal } from '../components/CategoryCreateModal'
  import { CategoryUpdateModal } from '../components/CategoryUpdateModal'

  export default defineComponent({
    components: {
      CategoryCreateModal,
      CategoryUpdateModal
    },

    async setup(){
      const model = ref<ICategoryModel>(CategoryModel.create())
      const updates = ref<Partial<ICategory>>({})
      const currentItem = ref<Maybe<ICategory>>(null)

      const showCreateModal = ref<boolean>(false)
      const showUpdateModal = ref<boolean>(false)

      const onEdit = (row) => {
        currentItem.value = row
        requestAnimationFrame(() => {
          showUpdateModal.value = true
        })
      }

      const onUploadImage = async (files) => {
        const res = await service.uploadCategoryImage(
          currentItem.value!._id,
          files
        )
        res && (updates.value.image = res.url)
      }

      const onDeleteImage = ({ id, url }) => {
        service.deleteCategoryImage(id, url)
          .then(() => {
            updates.value.image = undefined
            currentItem.value!.image = null
          })
          .catch((err) => console.log(err))
      }

      const onDeleteCategory = (row) => {
        service.deleteCategory(row)
      }

      const onSend = () => {
        service.createCategory(model.value)
          .then(() => model.value = CategoryModel.create())
          .then(() => showCreateModal.value = false)
      }

      const onUpdate = (update) => {
        updates.value = { ...update, ...updates.value }

        if (!Object.keys(updates.value).length) return

        updates.value._id = currentItem.value!._id

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
        onDeleteImage,
        onUpdate,
        onUploadImage,
        onDeleteCategory
      }
    }
  })
</script>
<template>
  <v-layout column>
    <v-row>
      <v-col>
        <v-data-table
          :cols="cols"
          :rows="service.store.state.categories"
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
          class="elevation-2"
          show-checkbox
          show-sequence
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
          <template #pagination-text="{start, last, length}">
            <span>{{ `с ${start} по ${last} из ${length}` }}</span>
          </template>
          <template #actions="{row}">
            <v-button
              color="orange"
              elevation="2"
              text
              @click="onEdit(row)"
            >
              <v-icon>fas fa-pen</v-icon>
            </v-button>
            <v-button
              class="ml-1"
              color="red darken-1"
              elevation="2"
              text
              @click="onDeleteCategory(row)"
            >
              <v-icon>fas fa-trash-alt</v-icon>
            </v-button>
          </template>
          <template #image="{ row }">
            <div class="d-flex justify-center align-center">
              <img
                v-if="row.image"
                style="height: 30px; width: auto"
                :src="`http://anar.com/${row.image}`"
              />
              <v-icon v-else>
                fas fa-box
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <category-create-modal
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
    <category-update-modal
      v-model="showUpdateModal"
      :item="currentItem"
      :categories="service.store.state.categories"
      @delete:image="onDeleteImage"
      @upload:image="onUploadImage"
      @update="onUpdate"
    />
  </v-layout>
</template>
