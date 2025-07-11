import { RefreshToken } from "@users/entities/RefreshToken.ts";

export type CreateRefreshTokenDTO = {
  user_id: string;
  token: string;
  expires: Date;
  valid: boolean;
}

export interface IRefreshTokenRepository {
  create({ user_id, token, expires, valid }: CreateRefreshTokenDTO): Promise<RefreshToken>
  findByToken(token: string): Promise<RefreshToken | null>
  invalidate(refreshToken: RefreshToken): Promise<void>
}
