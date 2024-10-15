import { AuthResponse } from 'src/models/account/tokens.type';
import { LocalStorage } from 'quasar';
import { AUTH_STORAGE_KEY } from './local-keys';
import { CLOUD_ADDRESS } from './local-keys';
import { useAppStore } from 'src/stores/app.store';

const store = useAppStore();

export interface IAuthLocalStorage {
  saveTokensInStorage(tokens: AuthResponse): void;
  getAuthDataFromStorage(): AuthResponse;
  clearLocalAuthData(): void;
  getCloudServerAddress(): string;
  setCloudServerAddress(address: string): void;
}

export class AuthLocalService implements IAuthLocalStorage {
  getAuthDataFromStorage(): AuthResponse {
    return LocalStorage.getItem(AUTH_STORAGE_KEY) as AuthResponse;
  }
  saveTokensInStorage(tokens: AuthResponse): void {
    LocalStorage.setItem(AUTH_STORAGE_KEY, tokens);
  }
  clearLocalAuthData() {
    LocalStorage.removeItem(AUTH_STORAGE_KEY);
    store.username = undefined;
    store.handleSuccess('You are logged out');
  }
  getCloudServerAddress() {
    return LocalStorage.getItem(CLOUD_ADDRESS) as string;
  }
  setCloudServerAddress(address: string) {
    LocalStorage.setItem(CLOUD_ADDRESS, address);
  }
}
