<script setup lang="ts">
// import TimelineBoard from 'components/TimelineBoard.vue';
import { useAppStore } from 'src/stores/app.store';
const appStore = useAppStore();
appStore.toolbarTabs = [];
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <!-- <TimelineBoard /> -->
    <div>Welkom in Mediko App</div>
  </q-page>
</template>
