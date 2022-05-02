<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'product-layout',
    setup(){
      return {}
    }
  })
</script>
<template>
  <v-main>
    <div class="routes-container">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <Suspense>
            <template #default>
              <div class="screen">
                <component :is="Component" />
              </div>
            </template>
            <template #fallback>
              <span style="position: absolute">loading...</span>
            </template>
          </Suspense>
        </transition>
      </router-view>
    </div>
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
