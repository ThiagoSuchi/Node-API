import { AppError } from "@shared/utils/errors/AppErro";
import { User } from "@users/entities/User";
import { IUserRepository } from "@users/repositories/IUserRepository";

import { inject, injectable } from "tsyringe";

export type ShowProfileParams = {
  userId: string
}

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
  ) {}

  async execute({ userId }: ShowProfileParams): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user
  }
}
