<script setup>
import { RouterView } from 'vue-router'
import NavSection from './components/NavSection.vue';

</script>

<template>
<div class="d-flex flex-column min-vh-100">
  <NavSection />
  <main class="flex-grow-1 d-flex align-items-center justify-content-center mb-5">
    <RouterView />
  </main>
</div>
</template>

<style>

</style>
