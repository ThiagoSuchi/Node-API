//permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { createRolesController } from "@roles/useCases/createRole";
import { deleteRolesController } from "@roles/useCases/deleteRole";
import { listRolesController } from "@roles/useCases/listRoles";
import { showRolesController } from "@roles/useCases/showRole";
import { updateRolesController } from "@roles/useCases/updateRole";
import { Router } from "express";

const rolesRouter = Router();

rolesRouter
  .post("/", createRolesController.handle.bind(createRolesController)) // Cria uma nova role
  .get("/",  listRolesController.handle.bind(listRolesController)) // Gera uma lista com todas as roles
  .get("/:id", showRolesController.handle.bind(showRolesController)) // Lista a role expecífica por id
  .put("/:id", updateRolesController.handle.bind(updateRolesController)) // Atualiza a role expecífica por id
  .delete("/:id", deleteRolesController.handle.bind(deleteRolesController)) // Atualiza a role expecífica por id

export { rolesRouter };
