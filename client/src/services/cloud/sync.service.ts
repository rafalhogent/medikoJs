import { AxiosInstance } from 'axios';
import { LogbookLocalService } from '../local/logbook.local.service';
import { useAppStore } from 'src/stores/app.store';

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
    } catch (error: any) {
      store.handleError('Sync failed', error?.message);
      console.log(error);
    }
  }
}
