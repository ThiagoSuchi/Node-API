import { inject, injectable } from "tsyringe";

import { IUserRepository, UsersPaginateProperties } from "@users/repositories/IUserRepository";

type ListUsersUseCaseParams = {
  page: number;
  limit: number;
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {};

  async execute({ page, limit }: ListUsersUseCaseParams): Promise<UsersPaginateProperties> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    return this.usersRepository.findAll({ page, skip, take });
  };
}
