import { AxiosError, AxiosInstance } from 'axios';
import { LoginDto } from 'src/models/account/login.dto';
import { RegisterDto } from 'src/models/account/register.dto';
import { AuthResponse, Tokens } from 'src/models/account/tokens.type';
import { useAppStore } from 'src/stores/app.store';
import { IAuthLocalStorage } from '../local/auth.local.service';
import { LogbookLocalService } from '../local/logbook.local.service';
import Factory from '../service-factory';
import { QVueGlobals, useQuasar } from 'quasar';
import { isSpaPlatform } from 'src/utils/app-utils';
const backend_url_env = import.meta.env.VITE_BACKEND_BASE_URL;
const store = useAppStore();

export class AuthService {
  private readonly storageService: IAuthLocalStorage;
  private readonly axiosClient: AxiosInstance;
  private readonly quasarGlobals: QVueGlobals;

  constructor(
    axiosClient: AxiosInstance,
    localStorageService: IAuthLocalStorage,
    quasar: QVueGlobals,
  ) {
    this.axiosClient = axiosClient;
    this.storageService = localStorageService;
    this.quasarGlobals = quasar;
  }

  async loginToServer(dto: LoginDto) {
    try {
      delete this.axiosClient.defaults.headers.common['Authorization']; //= undefined;
      const response = await this.axiosClient.post<AuthResponse>(
        `/auth/login`,
        dto,
      );
      if (response) {
        this.storageService.saveTokensInStorage(response.data);
        this.axiosClient.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.access_token}`;
        store.username = response.data.user;
        store.handleSuccess(
          `You are successful signed in as ${store.username}`,
        );
        LogbookLocalService.clearLocalLogbooksData();
        Factory.getSyncService().syncLogbooks();
      }
    } catch (error: any) {
      store.handleError('Failed to login', error.response?.data?.message);
    }
  }

  async registerNewUser(dto: RegisterDto) {
    try {
      this.axiosClient.defaults.headers.common['Authorization'] = undefined;
      const response = await this.axiosClient.post<AuthResponse>(
        `/auth/register`,
        dto,
      );
      if (response) {
        this.storageService.saveTokensInStorage(response.data);
        this.axiosClient.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.access_token}`;

        store.username = response.data.user;
        LogbookLocalService.ensureDefaultLogbooks();
        Factory.getSyncService().syncLogbooks();
        store.handleSuccess(
          `You are successful signed in as ${store.username}`,
        );
      }
    } catch (error: any) {
      store.handleError('Failed to register', error.response?.data?.message);
    }
  }

  async refreshTokens() {
    const auth_data = this.storageService.getAuthDataFromStorage();
    if (auth_data) {
      this.axiosClient.defaults.headers.common['Authorization'] =
        `Bearer ${auth_data.refresh_token}`;
      const response =
        await this.axiosClient.post<AuthResponse>(`/auth/refresh`);

      if (response?.data) {
        this.storageService.saveTokensInStorage(response.data);
        store.username = response.data.user;
        this.axiosClient.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.access_token}`;
        return response.data;
      }
    } else {
      store.handleError('No valid auth data. Please login again');
    }
  }

  async getUserInfoFromServer() {
    const res = await this.axiosClient.get('auth/profile');
    return res;
  }

  async loadAuthDataFromStorage() {
    const auth_data = this.storageService.getAuthDataFromStorage();
    if (auth_data) {
      this.axiosClient.defaults.headers.common['Authorization'] =
        `Bearer ${auth_data.access_token}`;
      store.username = auth_data.user;
    }
  }

  setBackendUrl(address: string) {
    this.axiosClient.defaults.baseURL = address;
    this.storageService.setCloudServerAddress(address);
    store.serverAddress = address;
  }

  refreshBackendUrlFromStorage() {
    const url = this.storageService.getCloudServerAddress();
    if (url?.length) {
      this.setBackendUrl(url);
    }
  }

  loadBackendUrlFromEnv() {
    if (backend_url_env?.length) {
      this.setBackendUrl(backend_url_env);
    }
  }

  ensureBackendUrlLoaded() {
    if (isSpaPlatform(this.quasarGlobals)) {
      this.loadBackendUrlFromEnv();
    } else {
      this.refreshBackendUrlFromStorage();
    }
  }
}
