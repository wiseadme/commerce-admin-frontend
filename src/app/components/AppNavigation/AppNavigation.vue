<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup(){
      const $router = useRouter()

      const items = [
        {
          title: 'Категории',
          icon: 'fas fa-cubes',
          path: '/categories'
        },
        {
          title: 'Товары',
          icon: 'fas fa-boxes',
          path: '/products'
        },
        {
          title: 'Атрибуты',
          icon: 'fab fa-buffer',
          path: '/attributes'
        },
        {
          title: 'Измерения',
          icon: 'fab fa-unity',
          path: '/units'
        }
      ]

      let current = ref<Maybe<number>>(null)

      current.value = items.findIndex(it => {
        return it.path === $router.currentRoute.value.path
      })

      const onSelect = (it) => {
        $router.push(it.path)
      }

      return {
        current,
        items,
        onSelect
      }
    }
  })
</script>
<template>
  <v-navigation
    fixed
    expand
    color="#272727"
    offset-top="56"
    class="elevation-2"
  >
    <v-list
      v-model:value="current"
      active-class="green white--text text--base"
      active
      text-color="#ffffff"
    >
      <v-list-item
        v-for="it in items"
        :key="it.title"
        @click="onSelect(it)"
      >
        <v-list-item-icon>
          <v-icon>{{ it.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ it.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation>
</template>
<style lang="scss">
  @import 'AppNavigation';
</style>
