<template>
  <div class="app-root">
    <AppSplash />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AppSplash from '@/components/Page/AppSplash.vue'
</script>