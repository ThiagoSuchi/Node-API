import { RolesRepository } from "@roles/repositories/RolesRepository";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";
import { UpdateRoleController } from "./UpdateRoleController";


const roleRepository = RolesRepository.getInstance()
const updateRolesUseCase = new UpdateRoleUseCase(roleRepository);
export const updateRolesController = new UpdateRoleController(updateRolesUseCase);
