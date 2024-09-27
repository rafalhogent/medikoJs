export class Tokens  {
  access_token!: string;
  refresh_token!: string;
};

export class AuthResponse extends Tokens {
  user?: string;
  access_expiresAt?: Date
}