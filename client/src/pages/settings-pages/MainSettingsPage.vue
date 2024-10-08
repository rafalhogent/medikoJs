<script setup lang="ts">
import { useAppStore } from 'src/stores/app.store';
import { useRouter } from 'vue-router';

const store = useAppStore();
const router = useRouter();

const settingsItems: {
  icon: string;
  label: string;
  description?: string;
  to?: string;
  action?: () => void;
}[] = [
  {
    icon: 'mdi-book-open-outline',
    label: 'Logbooks Settings',
    description: 'Select visible logbooks',
    to: '/settings/logbooks',
    action: () => {
      store.prepareLogbookSettingsPage();
      router.push('/settings/logbooks');
    },
  },
];
</script>

<template>
  <q-list class="q-ma-lg">
    <q-item
      v-for="item in settingsItems"
      clickable
      @click="
        () => {
          if (item.action) item.action();
        }
      "
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>{{ item.label }}</q-item-section>
      <q-item-section side>
        <q-item-label caption>{{ item.description }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
