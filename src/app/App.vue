<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AppHeader } from '@shared/components/AppHeader'
import { AppNavigation } from '@shared/components/AppNavigation'

export default defineComponent({
  components: { AppHeader, AppNavigation },
  setup() {
    const name = ref('sdsdf')

    return {
      name,
    }
  },
})
</script>
<template>
  <v-app>
    <v-layout column>
      <app-header />
      <app-navigation />
      <v-main style="padding: 66px 10px 10px 247px">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>
<style lang="scss">
@import '../shared/assets/scss/main';
</style>
