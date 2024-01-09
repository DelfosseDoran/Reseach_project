<script setup lang="ts">
import Header from './components/layout/Header.vue';
</script>

<template>
  <div class="grid h-screen grid-rows-[min-content_1fr] bg-slate-200">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
</style>
