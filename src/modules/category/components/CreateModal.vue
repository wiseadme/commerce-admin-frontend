<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useCategoryStore } from '@modules/category/store'

export default defineComponent({
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue', 'send'],
  async setup(_, { emit }) {
    const store = useCategoryStore()

    const category = reactive({
      title: null,
      url: null,
      image: null,
      seo: {
        title: null,
        description: null,
        keywords: null,
      },
      parent: null,
      children: [],
      order: 0,
    })

    const onSend = async (validate) => {
      validate().then(() => emit('send', category))
    }

    return {
      ...toRefs(category),
      store,
      onSend,
    }
  },
})
</script>
<template>
  <v-modal
    :model-value="modelValue"
    transition="scale-in"
    overlay
  >
    <v-form v-slot="{ validate }">
      <v-card
        class="elevation-3"
        width="600"
        color="white"
      >
        <v-card-title> Создание категории</v-card-title>
        <v-card-content style="max-height: 50vh; overflow: auto">
          <v-text-field
            v-model="title"
            label="название"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model="url"
            label="url категории"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model="seo.title"
            label="seo title"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model="seo.description"
            label="seo description"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model="seo.keywords"
            label="seo keywords"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-select
            v-if="store && store.state.categories"
            v-model="parent"
            label="Родительская категория"
            :items="store.state.categories"
            value-key="title"
          />
          <v-file-input label="загрузите изображения" />
        </v-card-content>
        <v-card-actions>
          <v-button
            color="orange darken-3"
            @click="onSend(validate)"
          >
            Создать
          </v-button>
          <v-button
            color="error"
            class="ml-2"
            @click="$emit('update:modelValue', false)"
          >
            Закрыть
          </v-button>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-modal>
</template>
