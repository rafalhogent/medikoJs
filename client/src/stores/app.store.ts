import { defineStore } from 'pinia';
import { QTabProps } from 'quasar';
import { Ref, ref } from 'vue';

export const useAppStore = defineStore('appStore', () => {
  const toolbarTabs: Ref<QTabProps[]> = ref([]);
  const selectedTab = ref('');

  const username: Ref<string | undefined> = ref(undefined);

  return { toolbarTabs, selectedTab, username };
});
