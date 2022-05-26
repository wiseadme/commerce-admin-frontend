<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useCategoryService } from '@modules/category/service/category.service'
  import { CategoryModel } from '@modules/category/model/category.model'
  import { getDifferences, clone } from '@shared/helpers'

  import { CategoryActionsModal } from '../components/CategoryActionsModal'

  export default defineComponent({
    components: {
      CategoryActionsModal
    },

    async setup(){
      const categoryModel = ref<ICategoryModel>(CategoryModel.create({}))
      const categoryUpdates = ref<Maybe<ICategory>>(null)

      const isEditMode = ref<boolean>(false)
      const showModal = ref<boolean>(false)

      const service = useCategoryService()

      const model = computed<Maybe<ICategory> | ICategoryModel>(() => {
        if (isEditMode.value) return categoryUpdates.value
        return categoryModel.value
      })

      const onEdit = (row) => {
        service.setAsCurrent(row)
        categoryUpdates.value = clone(row)

        isEditMode.value = true
        showModal.value = true
      }

      const onUploadImage = (files) => {
        service.uploadImageHandler(files)
          .then((url) => model.value!.image = url)
      }

      const onDeleteImage = (url) => {
        service.deleteImageHandler(url)
          .then(() => model.value!.image = null)
      }

      const onDeleteCategory = (category) => {
        service.deleteCategoryHandler(category)
      }

      const onAddNew = () => {
        showModal.value = true
        isEditMode.value = false
        service.setAsCurrent(null)
        categoryModel.value = CategoryModel.create({})
      }

      const onSend = () => {
        service.createCategoryHandler(model.value)
          .then(() => categoryModel.value = CategoryModel.create({}))
          .then(() => showModal.value = false)
      }

      const onUpdate = async () => {
        const updates: Maybe<ICategoryUpdates> = getDifferences(
          categoryUpdates.value,
          service.category
        ) as ICategoryUpdates

        if (updates) {
          updates!._id = service.category!._id

          if (updates!.parent) updates!.parent = categoryUpdates.value!.parent._id

          await service.updateHandler(updates!)

          showModal.value = false
          isEditMode.value = false
        }
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
          format: (row) => row.seo.title
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

      await service.getCategories()

      return {
        cols,
        isEditMode,
        showModal,
        model,
        service,
        onAddNew,
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
          :rows="service.categories"
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
                  @click="onAddNew"
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
            <span>{{ `с ${ start } по ${ last } из ${ length }` }}</span>
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
                :src="`http://anar.com${row.image}`"
              />
              <v-icon v-else>
                fas fa-box
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <category-actions-modal
      v-model="showModal"
      v-model:title="model.title"
      v-model:url="model.url"
      v-model:image="model.image"
      v-model:seo-title="model.seo.title"
      v-model:seo-description="model.seo.description"
      v-model:seo-keywords="model.seo.keywords"
      v-model:parent="model.parent"
      v-model:order="model.order"
      :categories="service.categories"
      :is-update="isEditMode"
      @create="onSend"
      @update="onUpdate"
      @delete:image="onDeleteImage"
      @upload:image="onUploadImage"
    />
  </v-layout>
</template>
