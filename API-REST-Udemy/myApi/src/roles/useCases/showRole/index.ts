import { RolesRepository } from "@roles/repositories/RolesRepository";
import { ShowRoleController } from "./ShowRoleController";
import { ShowRoleUseCase } from "./ShowRoleUseCase";

const roleRepository = RolesRepository.getInstance()
const showRolesUseCase = new ShowRoleUseCase(roleRepository);
export const showRolesController = new ShowRoleController(showRolesUseCase);
