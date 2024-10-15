import { AxiosError, type AxiosInstance } from 'axios';
import Axios from 'axios';
import { AuthService } from './cloud/auth.cloud.service';
import {
  AuthLocalService,
  IAuthLocalStorage,
} from './local/auth.local.service';
import { useAppStore } from 'src/stores/app.store';
import { SyncService } from './cloud/sync.service';
import { useQuasar } from 'quasar';

const store = useAppStore();
const backend_url = store.serverAddress;

export default class Factory {
  private static axiosClient: AxiosInstance;
  private static authService: AuthService;
  private static authStorageService: IAuthLocalStorage;
  private static refreshCounter: number = 0;
  private static syncService: SyncService;

  //#region private methods
  private static getAxiosClient(): AxiosInstance {
    if (!this.axiosClient) {
      this.axiosClient = Axios.create({
        baseURL: backend_url,
      });
      this.axiosClient.interceptors.response.use(
        (r) => r,
        async (error: AxiosError) => {
          if (
            this.refreshCounter < 3 &&
            (error.response?.data as any)?.message == 'BAD_TOKEN' &&
            error.response?.status === 401
          ) {
            this.refreshCounter++;

            const responsAfterRefresh = await this.getAuthService()
              .refreshTokens()
              .then(async (r) => {
                if (error.config && r?.access_token) {
                  const requestConfig = error.config;
                  requestConfig.headers['Authorization'] =
                    `Bearer ${r.access_token}`;
                  const newRes = await this.axiosClient.request(requestConfig);
                  this.refreshCounter = 0;
                  return newRes;
                }
              });
            return responsAfterRefresh;
          } else if (error.response?.status === 401) {
            store.handleError(
              'Unauthorized. Please login again',
              (error.response?.data as any)?.message,
            );
            return (error.response?.data as any)?.message as string;
          }
          throw error;
        },
      );
    }
    return this.axiosClient;
  }

  //#endregion

  //#region services
  static getAuthLocalStorageService() {
    if (!this.authStorageService) {
      this.authStorageService = new AuthLocalService();
    }
    return this.authStorageService;
  }

  static getAuthService() {
    if (!this.authService) {
      const $q = useQuasar();
      this.authService = new AuthService(
        this.getAxiosClient(),
        this.getAuthLocalStorageService(),
        $q,
      );
    }
    return this.authService;
  }

  static getSyncService() {
    if (!this.syncService) {
      this.syncService = new SyncService(this.getAxiosClient());
    }
    return this.syncService;
  }
  //#endregion
}
