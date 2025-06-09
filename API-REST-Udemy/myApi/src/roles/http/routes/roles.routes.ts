//permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { createRolesController } from "@roles/useCases/createRole";
import { deleteRolesController } from "@roles/useCases/deleteRole";
import { listRolesController } from "@roles/useCases/listRoles";
import { showRolesController } from "@roles/useCases/showRole";
import { updateRolesController } from "@roles/useCases/updateRole";
import { asyncHandler } from "@shared/utils/middlewares/asyncHandler";
import { validCelebrate } from "@shared/utils/validations/celebrate";
import { Router } from "express";

const rolesRouter = Router();

rolesRouter
  .post("/", validCelebrate('criar'), asyncHandler(createRolesController.handle.bind(createRolesController))) // Cria uma nova role
  .get("/", validCelebrate('listar'), asyncHandler(listRolesController.handle.bind(listRolesController))) // Gera uma lista com todas as roles
  .get("/:id", validCelebrate('listarId'), asyncHandler(showRolesController.handle.bind(showRolesController))) // Lista a role expecífica por id
  .put("/:id", validCelebrate('atualizar'), asyncHandler(updateRolesController.handle.bind(updateRolesController))) // Atualiza a role expecífica por id
  .delete("/:id", validCelebrate('deletar'), asyncHandler(deleteRolesController.handle.bind(deleteRolesController))) // Atualiza a role expecífica por id

export { rolesRouter };
