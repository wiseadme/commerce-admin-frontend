<script lang="ts">
  import { defineComponent, ref, toRaw } from 'vue'
  import draggable from 'vuedraggable'
  import { useAttributeService } from '../service/attribute.service'
  import { clone } from '@shared/helpers'

  export default defineComponent({
    name: 'attribute-page',
    components: {
      draggable
    },
    async setup(){
      const attributes: Array<IAttribute> = ref(null)
      const attributePattern = ref<IAttributeModel>({
        key: '',
        value: '',
        meta: '',
        order: 0
      })

      const service = useAttributeService()

      const clearForm = () => {
        attributePattern.value = { key: '', value: '', meta: '' }
      }

      const onCreate = (validate) => {
        validate().then(() => {
          service.createAttribute(clone(toRaw(attributePattern.value)))
        })
      }

      const onChange = () => {
        attributes.value.forEach((it, i) => it.order = i)
        service.updateAttribute(attributes.value)
      }

      const onDelete = (attribute: IAttribute) => {
        service.deleteAttribute(attribute._id)
      }

      service.getAttributes()
        .then(() => attributes.value = clone(service.attributes))

      return {
        service,
        attributePattern,
        attributes,
        clearForm,
        onCreate,
        onDelete,
        onChange
      }
    }
  })
</script>
<template>
  <v-layout column>
    <v-row>
      <v-col
        xl="4"
        lg="6"
        md="12"
        sm="12"
      >
        <v-form v-slot="{validate}">
          <v-card
            width="100%"
            elevation="2"
            color="#ffffff"
          >
            <v-card-title class="green--text">
              <h3>Аттрибуты</h3>
            </v-card-title>
            <v-card-content>
              <v-text-field
                v-model="attributePattern.key"
                label="Название*"
                color="#272727"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-model="attributePattern.value"
                label="Значение по умолчанию*"
                color="#272727"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-model="attributePattern.meta"
                label="Мета информация"
                color="#272727"
              />
              <v-text-field
                v-model="attributePattern.order"
                label="Порядковый номер"
                color="#272727"
                type="number"
              />
            </v-card-content>
            <v-card-actions class="">
              <v-button
                elevation="2"
                color="green"
                @click="onCreate(validate)"
              >
                <v-icon
                  size="14"
                >
                  fas fa-plus
                </v-icon>
              </v-button>
              <v-button
                elevation="2"
                color="error"
                class="ml-2"
                @click="clearForm"
              >
                <v-icon
                  size="14"
                >
                  fas fa-trash-alt
                </v-icon>
              </v-button>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col
        xl="8"
        lg="6"
        md="12"
        sm="12"
      >
        <template v-if="attributes">
          <draggable
            v-model="attributes"
            item-key="_id"
            @change="onChange"
          >
            <template #item="{element}">
              <div
                class="d-flex justify-start align-center elevation-2 my-1 py-4 px-3 white"
              >
                <v-icon
                  class="mr-3"
                  color="grey lighten-2"
                >
                  fas fa-grip-vertical
                </v-icon>
                <span>
                  {{ element.key }}
                </span>
                <v-spacer></v-spacer>
                <v-icon
                  clickable
                  color="green"
                  @click="onDelete(element)"
                >
                  fas fa-times
                </v-icon>
              </div>
            </template>
          </draggable>
        </template>
      </v-col>
    </v-row>
  </v-layout>
</template>
