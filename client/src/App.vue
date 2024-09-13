<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { LogbookLocalService } from './services/local/logbook.local.service';

onBeforeMount(() => {
  LogbookLocalService.ensureDefaultLogbooks();
});
</script>
