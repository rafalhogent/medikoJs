import {
  AxiosError,
  type AxiosInstance,
} from 'axios';
import Axios from 'axios';
import { AuthService } from './cloud/auth.cloud.service';
import {
  AuthLocalService,
  IAuthLocalStorage,
} from './local/auth.local.service';
const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

export default class Factory {
  private static axiosClient: AxiosInstance;
  private static authService: AuthService;
  private static authStorageService: IAuthLocalStorage;

  //#region private methods
  private static getAxiosClient(): AxiosInstance {
    if (!this.axiosClient) {
      this.axiosClient = Axios.create({
        baseURL: backend_url,
      });
      this.axiosClient.interceptors.response.use(
        (r) => r,
        (error: AxiosError) => {
          console.log(error.response?.data);
          // TODO implement notification about failed request
          //  if statusCode == 401 -> login required
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
