<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { ProductCreateModal } from '../components/ProductCreateModal'
  import { useProductService } from '@modules/product/service/product.service'
  import { useCategoryService } from '@modules/category/service/category.service'
  import { ProductModel } from '@modules/product/model/product.model'

  export default defineComponent({
    components: { ProductCreateModal },

    async setup(){
      const model = ref<IProductModel>(ProductModel.create())
      const showCreateModal = ref(false)

      const productService = useProductService()
      const categoryService = useCategoryService()

      const onCreate = () => {
        productService.createProductHandler(model.value)
          .then(res => console.log(res))
      }

      const onDeleteProduct = (product) => {
        productService.deleteProduct(product)
          .then(res => console.log(res))
      }

      if (!categoryService.categories) {
        await categoryService.getCategories()
      }

      await productService.getProducts()

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

      return {
        cols,
        model,
        categoryService,
        productService,
        showCreateModal,
        onCreate,
        onDeleteProduct
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
        </v-data-table>
      </v-col>
    </v-row>
    <product-create-modal
      v-model="showCreateModal"
      v-model:name="model.name"
      v-model:price="model.price"
      v-model:count="model.count"
      v-model:url="model.url"
      v-model:unit="model.unit"
      v-model:description="model.description"
      v-model:categories="model.categories"
      v-model:seo="model.seo"
      v-model:attributes="model.attributes"
      v-model:variants="model.variants"
      v-model:is-visible="model.isVisible"
      :category-items="categoryService.categories"
      @create="onCreate"
    />
  </v-layout>
</template>
