//permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { createRolesController } from "@roles/useCases/createRole";
import { listRolesController } from "@roles/useCases/listRoles";
import { Router } from "express";

const rolesRouter = Router();

// Cria uma nova role
rolesRouter.post("/", (req, res) => {
  createRolesController.handle(req, res)
});

// Gera uma lista com todas as roles
rolesRouter.get("/", (req, res) => {
  listRolesController.handle(req, res);
});

export { rolesRouter };
