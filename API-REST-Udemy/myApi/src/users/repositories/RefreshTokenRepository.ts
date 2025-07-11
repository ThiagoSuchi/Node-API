import { RefreshToken } from "@users/entities/RefreshToken.ts";
import { CreateRefreshTokenDTO, IRefreshTokenRepository } from "./IRefreshTokenRepository";
import { Repository } from "typeorm";
import { dataSource } from "@shared/typeorm";
import { AppError } from "@shared/utils/errors/AppErro";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    // Irá criar um repositório para manipular a entidade RefreshToken
    this.repository = dataSource.getRepository(RefreshToken);
  };

  async create({ user_id, token, expires, valid }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.repository.create({
      user_id,
      token,
      expires,
      valid
    });

    return this.repository.save(refreshToken);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.repository.findOneBy({ token })// short sintaxe
  }

  async invalidate(refresh_Token: RefreshToken): Promise<void> {
    const refreshToken = await this.findByToken(refresh_Token.token)

    if (!refreshToken) {
      throw new AppError('Refresh Token not found', 404)
    }

    refreshToken.valid = false;
    await this.repository.save(refreshToken);
  }
}
