import { defineStore } from 'pinia';
import { QTabProps } from 'quasar';
import { Ref, ref } from 'vue';
import { Notify } from 'quasar';

export const useAppStore = defineStore('appStore', () => {
  const toolbarTabs: Ref<QTabProps[]> = ref([]);
  const selectedTab = ref('');

  const username: Ref<string | undefined> = ref(undefined);

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

  return { toolbarTabs, selectedTab, username, handleSuccess, handleError };
});
