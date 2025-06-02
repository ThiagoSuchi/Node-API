import { RolesRepository } from "@roles/repositories/RolesRepository";
import { ShowRoleUseCase } from "./ShowRoleController";
import { ShowRoleController } from "./ShowRoleUseCase";

const roleRepository = RolesRepository.getInstance()
const showRolesUseCase = new ShowRoleUseCase(roleRepository);
export const showRolesController = new ShowRoleController(showRolesUseCase);
