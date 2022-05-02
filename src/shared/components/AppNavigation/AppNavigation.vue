<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup(){
      const $router = useRouter()
      const items = [
        {
          title: 'Категории',
          icon: 'fas fa-cubes',
          path: '/category'
        },
        {
          title: 'Товары',
          icon: 'fas fa-boxes',
          path: '/product/create'
        }
      ]

      let current = null

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
    color="orange darken-3"
    offset-top="56"
    class="elevation-2"
  >
    <v-list
      v-model="current"
      active-class="white orange--text text--darken-3"
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
