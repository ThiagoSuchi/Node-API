//permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRoleController } from "@roles/useCases/createRole/CreateRoleController";
import { Router } from "express";

const rolesRouter = Router();
const createRolesController = new CreateRoleController();
const rolesRepository = new RolesRepository();

rolesRouter.post("/", (req, res) => {
  createRolesController.handle(req, res)
});

rolesRouter.get("/", (req, res) => {
  const roles = rolesRepository.findAll();
  res.json(roles);
});

export { rolesRouter };
