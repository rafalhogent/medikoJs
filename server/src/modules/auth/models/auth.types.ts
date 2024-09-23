export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type ExtractedToken = {
  token_type: string | undefined;
  token_value: string | undefined;
};

