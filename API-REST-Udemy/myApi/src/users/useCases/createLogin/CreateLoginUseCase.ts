import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import jwtConfig from "@config/auth";
import { AppError } from "@shared/utils/errors/AppErro";
import { User } from "@users/entities/User";
import { IUserRepository } from "@users/repositories/IUserRepository";
import { IRefreshTokenRepository } from "@users/repositories/IRefreshTokenRepository";

export type CreateLoginDTO = {
  email: string
  password: string
}

type IResponse = {
  user: User,
  accessToken: string,
  refreshToken: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
    @inject('RefreshTokenRepository') private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const accessToken = sign(
      { sub: user.id },
      jwtConfig.jwt.secret as string
    );

    const expires = new Date(Date.now() + jwtConfig.refreshToken.duration);

    const refreshToken = sign(
      { sub: user.id },
      jwtConfig.refreshToken.secret as string,
    );

    await this.refreshTokenRepository.create({
      user_id: user.id,
      token: refreshToken,
      expires,
      valid: true
    })

    return {
      user,
      accessToken,
      refreshToken
    }
  }
}
