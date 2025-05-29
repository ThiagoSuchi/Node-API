import { RolesRepository } from "@roles/repositories/RolesRepository";
import { ListRolesUseCase } from "./ListRolesUseCase";
import { ListRolesController } from "./ListRolesController";

const roleRepository = RolesRepository.getInstance()
const listRolesUseCase = new ListRolesUseCase(roleRepository);
export const listRolesController = new ListRolesController(listRolesUseCase);
