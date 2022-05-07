<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'category-layout',
  setup() {
    return {}
  }
})
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <Suspense>
        <template #default>
          <component :is="Component" />
        </template>
      </Suspense>
    </transition>
  </router-view>
</template>
