<script lang="ts">
  import { defineCreateModal } from './define-create-modal'

  export default defineCreateModal()
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
            <v-card-content>
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
                v-if="state && state.categories"
                v-model="computedParentId"
                label="Родительская категория"
                :items="store.state.categories"
                value-key="title"
              />
              <v-file-input
                label="загрузите изображения"
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
