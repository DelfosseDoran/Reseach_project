<script setup lang="ts">
import Header from './components/layout/Header.vue';
</script>

<template>
  <div class="grid h-screen grid-rows-[min-content_1fr]">
    <Header />
    <RouterView class="bg-slate-200"/>
  </div>
</template>

<style scoped>
</style>
