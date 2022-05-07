<script lang="ts">
  import { defineUpdateModal } from './define-update-modal'

  export default defineUpdateModal
</script>
<template>
  <v-modal
    :model-value="modelValue"
    transition="scale-in"
    width="70%"
    overlay
  >
    <v-form v-slot="{ validate }">
      <v-card
        class="elevation-3"
        width="100%"
        color="white"
      >
        <v-card-title> Создание категории</v-card-title>
        <v-card-content style="max-height: 50vh; overflow: auto">
          <v-text-field
            v-model="computedTitleProp"
            label="название"
            color="orange darken-2"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model="computedUrlProp"
            label="url категории"
            color="orange darken-2"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model="computedSeoTitleProp"
            label="seo title"
            color="orange darken-2"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model="computedSeoDescProp"
            label="seo description"
            color="orange darken-2"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model="computedSeoKeywordsProp"
            label="seo keywords"
            color="orange darken-2"
            :rules="[(val) => !!val || 'Required']"
          />
          <v-text-field
            v-model.number="computedOrderProp"
            label="порядковый номер"
            color="orange darken-2"
            type="number"
          />
          <v-select
            v-model="computedParentProp"
            label="Родительская категория"
            :items="categories"
            :disabled="!categories"
            color="orange darken-2"
            value-key="title"
          />
          <v-file-input
            label="загрузите изображения"
            color="orange darken-2"
            @update:model-value="$emit('upload', $event)"
          />
        </v-card-content>
        <v-card-actions>
          <v-button
            color="orange darken-3"
            @click="onUpdate(validate)"
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
