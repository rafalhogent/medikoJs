import { ExtractedToken } from '../models/auth.types';

export function extractToken(request: string): ExtractedToken | undefined {
  const [type, token] = request?.split(' ') ?? [];
  return {
    token_type: type,
    token_value: token,
  };
}
