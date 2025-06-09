import { RolesRepository } from "@roles/repositories/RolesRepository";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";
import { DeleteRoleController } from "./DeleteRoleController";

const roleRepository = RolesRepository.getInstance();
const deleteRolesUseCase = new DeleteRoleUseCase(roleRepository);
export const deleteRolesController = new DeleteRoleController(deleteRolesUseCase);
