import { IUserRepository } from "@users/repositories/IUserRepository";
import { UserRepository } from "@users/repositories/UserRepository";

import { container } from "tsyringe";

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);
