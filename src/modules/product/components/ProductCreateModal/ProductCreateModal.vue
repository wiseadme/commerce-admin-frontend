<script lang="ts">
  import { productCreateModal } from './product-create-modal'

  export default productCreateModal
</script>
<template>
  <v-modal
    :model-value="modelValue"
    transition="scale-in"
    width="90%"
    overlay
  >
    <v-form v-slot="{validate}">
      <v-card
        color="#272727"
        width="100%"
        class="elevation-5"
      >
        <v-card-title class="green--text text--base">
          <h3>Создание продукта</h3>
        </v-card-title>
        <v-card-content
          class="grey lighten-3"
          width="100%"
          style="height: 70vh; max-height: 70vh; overflow: auto"
        >
          <v-row>
            <v-col xl="8">
              <v-row>
                <v-col xl="6">
                  <v-text-field
                    label="Наименование товара"
                    color="#272727"
                    text-color="#272727"
                  />
                </v-col>
                <v-col xl="6">
                  <v-text-field
                    label="Цена"
                    color="#272727"
                    text-color="#272727"
                    type="number"
                  />
                </v-col>
              </v-row>
              <v-row no-gutter>
                <v-col
                  class="elevation-2 white"
                >
                  <v-card width="100%">
                    <v-card-title>
                      <h3>Описание товара</h3>
                    </v-card-title>
                    <v-card-content>
                      <text-editor></text-editor>
                    </v-card-content>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col xl="4">
              <v-row no-gutter>
                <v-col
                  xl="12"
                  class="elevation-2 pt-2 white"
                >
                  <v-card width="100%">
                    <v-card-title>
                      <h3>
                        Категории
                      </h3>
                    </v-card-title>
                    <v-card-content>
                      <template
                        v-for="it in categories"
                        :key="it._id"
                      >
                        <v-group
                          v-if="it.children.length"
                          :title="it.title"
                          active-class="grey lighten-2"
                          class="elevation-2"
                        >
                          <v-list>
                            <v-list-item
                              v-for="c in it.children"
                              :key="c._id"
                              :class="[{'green white--text text--base': ctgMap.get(c)}]"
                              @click="toggleCategory(c)"
                            >
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ c.title }}
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-group>
                        <v-list
                          v-else-if="!it.parent && !it.children.length"
                          active
                          multiple
                          class="elevation-2"
                          active-class="green white--text text--base"
                        >
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ it.title }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </template>
                    </v-card-content>
                  </v-card>
                </v-col>
                <v-col class="white mt-2 elevation-2">
                  <v-card
                    width="100%"
                  >
                    <v-card-title>
                      <h3>Атрибуты</h3>
                    </v-card-title>
                    <v-card-subtitle>
                      данный раздел актуален только после сохранения товара
                    </v-card-subtitle>
                  </v-card>
                </v-col>
                <v-col class="white mt-2 elevation-2">
                  <v-card
                    width="100%"
                  >
                    <v-card-title>
                      <h3>Варианты</h3>
                    </v-card-title>
                    <v-card-subtitle>
                      данный раздел актуален только после сохранения товара
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-content>
        <v-card-actions>
          <v-button
            color="white"
            elevation="3"
            width="120"
            outlined
            @click="onSend(validate)"
          >
            сохранить
          </v-button>
          <v-button
            color="warning"
            class="ml-4"
            width="120"
            elevation="3"
            outlined
            @click="$emit('update:modelValue', false)"
          >
            отмена
          </v-button>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-modal>
</template>
<style lang="scss">
  .card-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }
</style>
