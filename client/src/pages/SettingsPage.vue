<script setup lang="ts">
import { useAppStore } from 'src/stores/app.store';
import { onUnmounted } from 'vue';

const store = useAppStore();

onUnmounted(() => {
  store.resetSettingsPage();
});
</script>

<template>
  <q-page>
    <div>
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el
            v-for="c in store.settingsCrumbs"
            :icon="c.icon"
            :label="c.label"
            :to="c.to"
            @click="
              (e: Event) => {
                if (c.onClick) c.onClick(e);
              }
            "
          />
        </q-breadcrumbs>
      </div>
      <router-view />
    </div>
  </q-page>
</template>
