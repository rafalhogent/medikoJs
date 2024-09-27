import { AxiosInstance } from 'axios';
import { LoginDto } from 'src/models/account/login.dto';
import { RegisterDto } from 'src/models/account/register.dto';
import { AuthResponse, Tokens } from 'src/models/account/tokens.type';
import { useAppStore } from 'src/stores/app.store';
import { IAuthLocalStorage } from '../local/auth.local.service';

const store = useAppStore();

export class AuthService {
  private readonly storageService: IAuthLocalStorage;
  private readonly axiosClient: AxiosInstance;

  constructor(
    axiosClient: AxiosInstance,
    localStorageService: IAuthLocalStorage,
  ) {
    this.axiosClient = axiosClient;
    this.storageService = localStorageService;
  }

  async loginToServer(dto: LoginDto) {
    this.axiosClient.defaults.headers.common['Authorization'] = undefined;
    const response = await this.axiosClient.post<AuthResponse>(
      `/auth/login`,
      dto,
    );
    this.storageService.saveTokensInStorage(response.data);
    this.axiosClient.defaults.headers.common['Authorization'] =
      `Bearer ${response.data.access_token}`;
    store.username = response.data.user;
  }

  async registerNewUser(dto: RegisterDto) {
    this.axiosClient.defaults.headers.common['Authorization'] = undefined;
    const response = await this.axiosClient.post<AuthResponse>(
      `/auth/register`,
      dto,
    );
    this.storageService.saveTokensInStorage(response.data);
    this.axiosClient.defaults.headers.common['Authorization'] =
      `Bearer ${response.data.access_token}`;
    store.username = response.data.user;
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
}
