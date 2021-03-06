<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { ProductActionsModal } from '../components/ProductActionsModal'
  // Services
  import { useProductService } from '@modules/product/service/product.service'
  // Model
  import { Product } from '@modules/product/model/product.model'
  import { getDifferences } from '@shared/helpers'

  import { clone } from '@shared/helpers'

  export default defineComponent({
    components: { ProductActionsModal },

    async setup(){
      const model = ref<IProduct>(Product.create())
      const showCreateModal = ref<boolean>(false)
      const isEditMode = ref(false)

      const cols = ref([
        {
          key: 'actions',
          title: 'Действия',
          align: 'center'
        },
        {
          key: 'name',
          title: 'Название',
          width: '300',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.name
        },
        {
          key: 'url',
          title: 'Url товара',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.url
        },
        {
          key: 'price',
          title: 'Цена',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.price
        },
        {
          key: 'count',
          title: 'Количество',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.count
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
          key: 'categories',
          title: 'Категории',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.categories.reduce((acc, c, i, arr) => {
            acc += c.title
            if (i + 1 !== arr.length) acc += ', '

            return acc
          }, '')
        },
        {
          key: 'seo',
          title: 'SEO',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: (row) => row.seo.title
        }
      ])

      const service = useProductService()

      const onCreate = () => {
        service.createProduct(model.value)
          .then(() => showCreateModal.value = false)
          .then(() => model.value = Product.create())
      }

      const onAdd = () => {
        showCreateModal.value = true
        isEditMode.value = false

        model.value = Product.create()
        model.value.attributes = clone(service.attributes)
      }

      const onUpdate = () => {
        const updates: Maybe<IProduct> = getDifferences(
          model.value,
          service.product
        ) as IProduct

        !!updates && (updates._id = model.value._id)

        !!updates && service.updateProduct(updates)
          .then(() => {
            showCreateModal.value = false
            isEditMode.value = false
          })
      }

      const onDeleteProduct = (product) => {
        service.deleteProduct(product)
      }

      const onUploadImage = (files) => {
        service.uploadProductImage(files)
      }

      const onDeleteImage = (url) => {
        service.deleteProductImage(url)
          .then(() => {
            model.value.assets = model.value.assets?.filter(it => it.url !== url)!
          })
      }

      const onEdit = (row) => {
        service.setAsCurrent(row)

        showCreateModal.value = true
        isEditMode.value = true
      }

      watch(
        () => service.product,
        to => model.value = Product.create(to!)
      )

      watch(model, to => console.log(to), { deep: true })

      Promise.all([
        service.getCategories(),
        service.getAttributes(),
        service.getProducts(),
        service.getUnits()
      ])

      return {
        cols,
        model,
        service,
        showCreateModal,
        isEditMode,
        onCreate,
        onUpdate,
        onEdit,
        onAdd,
        onDeleteProduct,
        onDeleteImage,
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
      >
        <v-data-table
          :cols="cols"
          :rows="service.products"
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
                  @click="onAdd"
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
              @click="onDeleteProduct(row)"
            >
              <v-icon>fas fa-trash-alt</v-icon>
            </v-button>
          </template>
          <template #image="{row}">
            <img
              v-if="row.image"
              :src="'http://localhost' + row.image"
              :alt="row.name"
              style="width: auto; height: 30px"
            >
            <span v-else>null</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <product-actions-modal
      v-model="showCreateModal"
      v-model:name="model.name"
      v-model:price="model.price"
      v-model:count="model.count"
      v-model:assets="model.assets"
      v-model:image="model.image"
      v-model:url="model.url"
      v-model:unit="model.unit"
      v-model:description="model.description"
      v-model:categories="model.categories"
      v-model:seo="model.seo"
      v-model:attributes="model.attributes"
      v-model:variants="model.variants"
      v-model:is-visible="model.isVisible"
      :category-items="service.categories"
      :unit-items="service.units"
      :is-update="isEditMode"
      @create="onCreate"
      @update="onUpdate"
      @upload:image="onUploadImage"
      @delete:image="onDeleteImage"
    />
  </v-layout>
</template>
