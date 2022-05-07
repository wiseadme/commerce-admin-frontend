<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'product-layout',
  setup() {
    return {}
  }
})
</script>
<template>
  <v-main>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <Suspense>
          <template #default>
            <component :is="Component" />
          </template>
        </Suspense>
      </transition>
    </router-view>
  </v-main>
</template>
<style lang="scss">
.routes-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.screen {
  width: 100%;
  height: 100%;
}
</style>
