<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { ProductActionsModal } from '../components/ProductActionsModal'
  // Services
  import { useProductService } from '@modules/product/service/product.service'
  import { useCategoryService } from '@modules/category/service/category.service'
  import { useAttributeService } from '@modules/attribute/service/attribute.service'
  // Model
  import { ProductModel } from '@modules/product/model/product.model'
  import { getDifferences } from '@shared/helpers'

  import { clone } from '@shared/helpers'

  export default defineComponent({
    components: { ProductActionsModal },

    async setup(){
      const model = ref<IProductModel>(ProductModel.create())
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

      const productService = useProductService()
      const categoryService = useCategoryService()
      const attributeService = useAttributeService()

      const onCreate = () => {
        productService.createProduct(model.value)
          .then(() => showCreateModal.value = false)
          .then(() => model.value = ProductModel.create())
      }

      const onAdd = () => {
        showCreateModal.value = true
        isEditMode.value = false

        model.value = ProductModel.create()
        model.value.attributes = clone(attributeService.attributes)
      }

      const onUpdate = () => {
        const updates: Maybe<IProduct> = getDifferences(
          model.value,
          productService.product
        ) as IProduct

        if (!updates) return

        productService.updateProduct(updates)
          .then(() => {
            showCreateModal.value = false
            isEditMode.value = false
          })
      }

      const onDeleteProduct = (product) => {
        productService.deleteProduct(product)
      }

      const onUploadImage = (files) => {
        productService.uploadProductImage(files)
      }

      const onDeleteImage = (url) => {
        productService.deleteProductImage(url)
          .then(() => {
            model.value.assets = model.value.assets?.filter(it => it.url !== url)!
          })
      }

      const onEdit = (row) => {
        productService.setAsCurrent(row)

        model.value = ProductModel.create(row)
        showCreateModal.value = true
        isEditMode.value = true
      }

      watch(
        () => productService.product,
        to => model.value = ProductModel.create(to!)
      )

      if (!categoryService.categories) {
        categoryService.getCategories()
      }

      if (!attributeService.attributes) {
        attributeService.getAttributes()
      }

      productService.getProducts()

      return {
        cols,
        model,
        categoryService,
        attributeService,
        productService,
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
          :rows="productService.products"
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
              :src="'http://anar.com' + row.image"
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
      v-model:url="model.url"
      v-model:unit="model.unit"
      v-model:description="model.description"
      v-model:categories="model.categories"
      v-model:seo="model.seo"
      v-model:attributes="model.attributes"
      v-model:variants="model.variants"
      v-model:is-visible="model.isVisible"
      :category-items="categoryService.categories"
      :is-update="isEditMode"
      @create="onCreate"
      @update="onUpdate"
      @upload:image="onUploadImage"
      @delete:image="onDeleteImage"
    />
  </v-layout>
</template>
