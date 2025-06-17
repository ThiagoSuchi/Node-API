import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRoleController } from "@roles/useCases/createRole/CreateRoleController";
import { DeleteRoleController } from "@roles/useCases/deleteRole/DeleteRoleController";
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController";
import { ShowRoleController } from "@roles/useCases/showRole/ShowRoleController";
import { UpdateRoleController } from "@roles/useCases/updateRole/UpdateRoleController";
import { container } from "tsyringe";

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository
);

/*
  Ao registrar como singleton, garante-se que apenas uma instância de
  CreateRoleController será criada e reutilizada durante todo o
  ciclo de vida da aplicação.
*/
container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('ListRolesController', ListRolesController)
container.registerSingleton('ShowRoleController', ShowRoleController)
container.registerSingleton('UpdateRoleController', UpdateRoleController)
container.registerSingleton('DeleteRoleController', DeleteRoleController)
