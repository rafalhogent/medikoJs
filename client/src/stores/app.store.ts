import { defineStore } from 'pinia';
import { QBreadcrumbsElProps, QTabProps } from 'quasar';
import { Ref, ref } from 'vue';
import { Notify } from 'quasar';

export const useAppStore = defineStore('appStore', () => {
  const toolbarTabs: Ref<QTabProps[]> = ref([]);
  const selectedTab = ref('');

  const username: Ref<string | undefined> = ref(undefined);

  //#region ui handlers
  const handleSuccess = (message: string, caption?: string) => {
    Notify.create({
      message: message,
      caption: caption,
      type: 'positive',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
        },
      ],
    });
  };

  const handleError = (message: string, caption?: string) => {
    Notify.create({
      message: message,
      caption: caption,
      type: 'negative',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
        },
      ],
    });
  };
  //#endregion

  //#region settings

  const settingsCrumb: QBreadcrumbsElProps = {
    label: 'Settings',
    icon: 'mdi-folder-wrench-outline',
    to: '/settings/main',
    onClick: (e: Event) => {
      resetSettingsPage();
    },
  };
  const logbooksCrumb: QBreadcrumbsElProps = {
    label: 'Logbooks',
    icon: 'mdi-book-open-outline',
    to: '/settings/logbooks',
    onClick: (e: Event) => {
      prepareLogbookSettingsPage();
    },
  };

  const settingsCrumbs: Ref<QBreadcrumbsElProps[]> = ref([settingsCrumb]);
  const prepareLogbookSettingsPage = () => {
    settingsCrumbs.value = [settingsCrumb, logbooksCrumb];
  };
  const resetSettingsPage = () => {
    settingsCrumbs.value = [settingsCrumb];
  };
  //#endregion

  return {
    toolbarTabs,
    selectedTab,
    username,
    handleSuccess,
    handleError,
    settingsCrumbs,
    prepareLogbookSettingsPage,
    resetSettingsPage,
  };
});
