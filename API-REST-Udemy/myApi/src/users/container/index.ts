import { IUserRepository } from "@users/repositories/IUserRepository";
import { UserRepository } from "@users/repositories/UserRepository";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsresController } from "@users/useCases/listUsers/ListUsersController";

import { container } from "tsyringe";

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);

container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsresController', ListUsresController)
