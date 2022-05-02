<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const $router = useRouter()
    const items = [
      {
        title: 'Категории',
        icon: 'fas fa-cubes',
        children: [
          {
            title: 'создать',
            path: '/category/create',
            icon: 'fas fa-plus',
            active: ref(false),
          },
          {
            title: 'редактировать',
            path: '/category/edit',
            icon: 'fas fa-pen',
            active: ref(false),
          },
        ],
      },
      {
        title: 'Товары',
        icon: 'fas fa-boxes',
        children: [
          {
            title: 'создать товар',
            path: '/product/create',
            icon: 'fas fa-plus',
            active: ref(false),
          },
        ],
      },
    ]

    let current

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
      onSelect,
    }
  },
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
    <v-group
      v-for="it in items"
      :key="it.title"
      :prepend-icon="it.icon"
      class="white--text text--white"
      active-class="elevation-3"
    >
      <template #header>
        {{ it.title }}
      </template>
      <v-list>
        <v-list-item
          v-for="c in it.children"
          :key="c.path"
          :class="['nav-item', { 'white orange--text text--darken-3': c.active.value }]"
          @click="onSelect(c)"
        >
          <v-list-item-icon>
            <v-icon>
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
