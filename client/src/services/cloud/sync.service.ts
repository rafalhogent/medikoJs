import { AxiosInstance } from 'axios';
import { LogbookLocalService } from '../local/logbook.local.service';
import { useAppStore } from 'src/stores/app.store';
import { delay } from 'src/utils/app-utils';

const store = useAppStore();

export class SyncService {
  private readonly axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  async syncLogbooks() {
    try {
      const lbs = LogbookLocalService.getAllLogbooksData();
      const resp = await this.axiosClient.patch('logbook', {
        logbooks: lbs,
        lastSyncMoment: undefined,
      });
      LogbookLocalService.saveLogbooksData(resp.data);
      // await delay(4000);
    } catch (error: any) {
      store.handleError('Sync failed', error?.message);
      console.log(error);
    }
  }

  async syncAllData() {
    store.startSyncNotif();
    Promise.all([
      await this.syncLogbooks(),
      // ... other data sync methods
    ]).then(() => {
      store.stopSyncNotif();
    });
  }
}
