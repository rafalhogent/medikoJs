import { defineStore } from 'pinia';
import { QTabProps, QTabsProps } from 'quasar';

export const useAppStore = defineStore('appStore', () => {
  const toolbarTabs: QTabProps[] = [];
  const selectedTab = '';
  return { toolbarTabs, selectedTab };
});
