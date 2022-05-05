<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'category-layout',
    setup(){
      return {}
    }
  })
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <Suspense>
        <template #default>
          <v-layout column>
            <component :is="Component" />
          </v-layout>
        </template>
        <template #fallback>
          <div style="position: absolute">
            Загрузка...
          </div>
        </template>
      </Suspense>
    </transition>
  </router-view>
</template>
<style lang="scss">
  .screen {
    width: 100%;
    height: 100%;
  }
</style>
