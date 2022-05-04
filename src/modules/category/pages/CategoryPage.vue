<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useCategoryService } from '@modules/category/service'
  import { state } from '@modules/category/store'

  import { CreateModal } from '../components/CreateModal'

  export default defineComponent({
    components: { CreateModal },

    async setup(){
      const {
        createCategory,
        getAllCategories,
        updateParentCategory,
        uploadCategoryImage
      } = useCategoryService()

      const showCreateModal = ref<boolean>(false)

      const onSend = (category) => {
        createCategory(category)
          .then(updateParentCategory)
          .catch((err) => console.log(err))
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
          format: row => row.title
        },
        {
          key: 'url',
          title: 'Url категории',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: row => row.url
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
          format: row => row.parent?.title
        },
        {
          key: 'seo',
          title: 'SEO',
          width: '250',
          resizeable: true,
          sortable: true,
          filterable: true,
          format: row => row.title
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

      await getAllCategories()

      return {
        state,
        cols,
        showCreateModal,
        onSend,
        uploadCategoryImage
      }
    }
  })
</script>
<template>
  <v-main>
    <v-row>
      <v-col
        cols="12"
        class="pa-1"
      >
        <v-data-table
          :cols="cols"
          :rows="state.categories"
          class="elevation-2"
          :header-options="{
            color: 'grey darken-3',
            contentColor: 'white'
          }"
        >
          <template #toolbar>
            <v-button
              color="green darken-2"
              @click="showCreateModal = true"
            >
              <v-icon>fas fa-plus</v-icon>
            </v-button>
          </template>
          <template #actions>
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
            >
              <v-icon>fas fa-trash-alt</v-icon>
            </v-button>
          </template>
          <template #image="{row}">
            <div class="d-flex justify-center align-center">
              <img
                style="height: 30px; width: auto"
                :src="`http://anar.com/${row.image}`"
                :alt="row.title"
              >
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <create-modal
      v-model="showCreateModal"
      @upload="uploadCategoryImage"
      @send="onSend"
    />
  </v-main>
</template>
