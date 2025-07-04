import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import jwtConfig from "@config/auth";
import { AppError } from "@shared/utils/errors/AppErro";
import { User } from "@users/entities/User";
import { IUserRepository } from "@users/repositories/IUserRepository";

export type CreateLoginDTO = {
  email: string
  password: string
}

type IResponse = {
  user: User,
  token: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
  ) {}

  async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password conbination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password conbination.', 401);
    }

    const token = sign(
      { subject: user.id },
      jwtConfig.jwt.secret,
      { expiresIn: '1d' }
    );

    return {
      user,
      token
    }
  }
}
