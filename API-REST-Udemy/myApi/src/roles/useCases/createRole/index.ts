import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { CreateRoleController } from "./CreateRoleController";

const rolesRepository = RolesRepository.getInstance();
const createRoleUseCase = new CreateRoleUseCase(rolesRepository);
export const createRolesController = new CreateRoleController(createRoleUseCase);
