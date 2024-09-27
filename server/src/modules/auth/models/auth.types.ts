export class Tokens  {
  access_token: string;
  refresh_token: string;
};

export class AuthResponse extends Tokens {
  user?: string;
  access_expiresAt?: Date
}

export type ExtractedToken = {
  token_type: string | undefined;
  token_value: string | undefined;
};

