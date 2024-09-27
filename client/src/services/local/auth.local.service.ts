import { AuthResponse } from 'src/models/account/tokens.type';
import { LocalStorage } from 'quasar';
import { AUTH_STORAGE_KEY } from './local-keys';

export interface IAuthLocalStorage {
  saveTokensInStorage(tokens: AuthResponse): void;
  getAuthDataFromStorage(): AuthResponse;
}

export class AuthLocalService implements IAuthLocalStorage {
  getAuthDataFromStorage(): AuthResponse {
    return LocalStorage.getItem(AUTH_STORAGE_KEY) as AuthResponse;
  }
  saveTokensInStorage(tokens: AuthResponse): void {
    LocalStorage.setItem(AUTH_STORAGE_KEY, tokens);
  }
}
