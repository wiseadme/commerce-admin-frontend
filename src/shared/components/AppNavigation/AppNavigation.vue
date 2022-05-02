<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup(){
      const $router = useRouter()

      let current

      const items = [
        {
          title: 'Категории',
          icon: 'fas fa-cubes',
          children: [
            { title: 'создать категорию', path: '/category/create', icon: '', active: ref(false) }
          ]
        },
        {
          title: 'товары',
          icon: 'fas fa-boxes',
          children: [
            { title: 'создать товар', path: '/product/create', icon: '', active: ref(false) }
          ]
        }
      ]

      const onSelect = (it) => {
        if (current) current.active.value = false
        requestAnimationFrame(() => {
          current = it
          it.active.value = true
          $router.push(current.path)
        })
      }
      return {
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
    offset-top="56"
    class="elevation-2"
  >
    <v-group
      v-for="it in items"
      :key="it.title"
      :prepend-icon="it.icon"
      active-class="blue--text text--darken-1"
    >
      <template #header>
        {{ it.title }}
      </template>
      <v-list>
        <v-list-item
          v-for="c in it.children"
          :key="c.path"
          :class="{'red darken-1 white--text text--white': c.active.value}"
          @click="onSelect(c)"
        >
          <v-list-item-icon>
            <v-icon color="red">
              {{ c.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ c.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-group>
  </v-navigation>
</template>
<style lang="scss">
  @import 'AppNavigation';
</style>
