<template>
  <div id="app">
    <Login v-if="!user" />
    <GymTable v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GymTable from './components/GymTable.vue'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../firebase';
import Login from './components/Login.vue';

const user = ref(null);

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });
});
</script>

<style>
:root {
  --p-primary-color: var(--p-orange-500) !important;
  --p-primary-hover-color: var(--p-orange-600) !important;
}
</style>