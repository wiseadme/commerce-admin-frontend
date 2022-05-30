<script>
  import { defineComponent, ref, toRaw } from 'vue'
  // import { useAttributeService } from '../service/attribute.service'
  import { clone } from '@shared/helpers'

  export default defineComponent({
    name: 'attribute-page',
    async setup() {
      const attributes = ref([])
      const attributePattern = ref({ key: '', value: '', meta: '' })

      // const service = useAttributeService()

      const clearForm = () => {
        attributePattern.value = { key: '', value: '', meta: '' }
      }

      const onCreate = (validate) => {
        validate().then(() => {
          attributes.value.push(clone(toRaw(attributePattern.value)))
        })
        // service.createAttribute(attribute)
      }

      return {
        attributes,
        attributePattern,
        clearForm,
        onCreate
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
        <div
          v-for="it in attributes"
          :key="it.key"
          class="d-flex justify-start align-center elevation-2 my-1 py-4 px-3 white"
        >
          <span>
            {{ it.key }}
          </span>
          <v-spacer></v-spacer>
          <v-icon clickable>
            fas fa-times
          </v-icon>
        </div>
      </v-col>
    </v-row>
  </v-layout>
</template>
