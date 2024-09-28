import { AxiosError, type AxiosInstance } from 'axios';
import Axios from 'axios';
import { AuthService } from './cloud/auth.cloud.service';
import {
  AuthLocalService,
  IAuthLocalStorage,
} from './local/auth.local.service';
import { useAppStore } from 'src/stores/app.store';
const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;
const store = useAppStore();

export default class Factory {
  private static axiosClient: AxiosInstance;
  private static authService: AuthService;
  private static authStorageService: IAuthLocalStorage;
  private static refreshCounter: number = 0;

  //#region private methods
  private static getAxiosClient(): AxiosInstance {
    if (!this.axiosClient) {
      Factory.axiosClient = Axios.create({
        baseURL: backend_url,
      });
      Factory.axiosClient.interceptors.response.use(
        (r) => r,
        async (error: AxiosError) => {
          if (
            Factory.refreshCounter < 3 &&
            (error.response?.data as any)?.message == 'BAD_TOKEN' &&
            error.response?.status === 401
          ) {
            Factory.refreshCounter++;

            const responsAfterRefresh = await this.getAuthService()
              .refreshTokens()
              .then(async (r) => {
                if (error.config && r?.access_token) {
                  const requestConfig = error.config;
                  requestConfig.headers['Authorization'] =
                    `Bearer ${r.access_token}`;
                  const newRes = await this.axiosClient.request(requestConfig);
                  Factory.refreshCounter = 0;
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

  static getAuthLocalStorageService() {
    if (!this.authStorageService) {
      this.authStorageService = new AuthLocalService();
    }
    return this.authStorageService;
  }
  //#endregion

  //#region services
  static getAuthService() {
    if (!this.authService) {
      this.authService = new AuthService(
        this.getAxiosClient(),
        this.getAuthLocalStorageService(),
      );
    }
    return this.authService;
  }
  //#endregion
}
