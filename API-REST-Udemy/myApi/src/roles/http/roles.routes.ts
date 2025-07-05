//permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { CreateRoleController } from "@roles/useCases/createRole/CreateRoleController";
import { DeleteRoleController } from "@roles/useCases/deleteRole/DeleteRoleController";
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController";
import { ShowRoleController } from "@roles/useCases/showRole/ShowRoleController";
import { UpdateRoleController } from "@roles/useCases/updateRole/UpdateRoleController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticator";
import { asyncHandler } from "@shared/utils/middlewares/asyncHandler";
import { validCelebrate } from "@shared/utils/validations/celebrate";
import { Router } from "express";
import { container } from "tsyringe";

const rolesRouter = Router();

const createRolesController = container.resolve(CreateRoleController);
const listRolesController = container.resolve(ListRolesController);
const showRolesController = container.resolve(ShowRoleController);
const updateRolesController = container.resolve(UpdateRoleController);
const deleteRolesController = container.resolve(DeleteRoleController);

rolesRouter.use(isAuthenticated); // para cada rota será atribuído esse middleware de permissão

rolesRouter
  .post("/", validCelebrate('criar'), asyncHandler(createRolesController.handle.bind(createRolesController))) // Cria uma nova role
  .get("/", validCelebrate('listar'), asyncHandler(listRolesController.handle.bind(listRolesController))) // Gera uma lista com todas as roles
  .get("/:id", validCelebrate('listarId'), asyncHandler(showRolesController.handle.bind(showRolesController))) // Lista a role expecífica por id
  .put("/:id", validCelebrate('atualizar'), asyncHandler(updateRolesController.handle.bind(updateRolesController))) // Atualiza a role expecífica por id
  .delete("/:id", validCelebrate('deletar'), asyncHandler(deleteRolesController.handle.bind(deleteRolesController))) // Atualiza a role expecífica por id

export { rolesRouter };
