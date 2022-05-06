<script lang="ts">
import { defineCreateModal } from './define-create-modal'

export default defineCreateModal
</script>
<template>
  <v-modal
    :model-value="modelValue"
    transition="scale-in"
    overlay
  >
    <v-row class="pa-1">
      <v-col
        xl="6"
        lg="6"
        md="6"
        sm="12"
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
                v-if="categories"
                v-model="computedParentProp"
                label="Родительская категория"
                :items="categories"
                color="orange darken-2"
                value-key="title"
                disabled
              />
              <v-file-input
                label="загрузите изображения"
                color="orange darken-2"
                disabled
                @update:model-value="$emit('upload', $event)"
              />
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
      </v-col>
    </v-row>
  </v-modal>
</template>
