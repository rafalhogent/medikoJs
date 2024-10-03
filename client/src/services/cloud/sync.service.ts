import { AxiosInstance } from 'axios';
import { LogbookLocalService } from '../local/logbook.local.service';
import { useAppStore } from 'src/stores/app.store';

const store = useAppStore();

export class SyncService {
  //   private readonly logbookLocalService: LogbookLocalService;
  private readonly axiosClient: AxiosInstance;

  constructor(
    axiosClient: AxiosInstance,
    // TODO save synced data in local storage 
    // logbookLocalService: LogbookLocalService,
  ) {
    this.axiosClient = axiosClient;
    // TODO save synced data in local storage 
    // this.logbookLocalService = logbookLocalService;
  }

  async syncLogbooks() {
    try {
      const lbs = LogbookLocalService.getAllDefaultLogbooksData();
      console.log(lbs);

      const resp = await this.axiosClient.patch('logbook', {
        logbooks: lbs,
        lastSyncMoment: undefined,
      });
      console.log('sync resp', resp.data);
    } catch (error: any) {
      store.handleError('Sync failed', error?.message);
      console.log(error);
    }
  }
}
