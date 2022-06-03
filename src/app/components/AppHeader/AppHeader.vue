<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  customClass: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <v-toolbar
    fixed
    color="green"
    class="elevation-3"
  >
    <v-toolbar-content>
      <v-toolbar-nav-btn class="white--text text--base" />
    </v-toolbar-content>
  </v-toolbar>
</template>
<style lang="scss">
@import 'AppHeader';
</style>
