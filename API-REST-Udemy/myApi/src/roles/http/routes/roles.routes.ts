//permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { createRolesController } from "@roles/useCases/createRole";
import { listRolesController } from "@roles/useCases/listRoles";
import { showRolesController } from "@roles/useCases/showRole";
import { updateRolesController } from "@roles/useCases/updateRole";
import { Router } from "express";

const rolesRouter = Router();

// Cria uma nova role
rolesRouter.post("/", async (req, res) => {
  await createRolesController.handle(req, res)
});

// Gera uma lista com todas as roles
rolesRouter.get("/", async (req, res) => {
  await listRolesController.handle(req, res);
});

// Lista a role expecífica por id
rolesRouter.get("/:id", async (req, res) => {
  await showRolesController.handle(req, res);
});

// Atualiza a role expecífica por id
rolesRouter.put("/:id", async (req, res) => {
  await updateRolesController.handle(req, res);
});

export { rolesRouter };
