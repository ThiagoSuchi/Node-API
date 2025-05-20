import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { CreateRoleController } from "./CreateRoleController";

const rolesRepository = new RolesRepository();
const createRoleUseCase = new CreateRoleUseCase(rolesRepository);
const createRolesControler = new CreateRoleController(createRoleUseCase);
