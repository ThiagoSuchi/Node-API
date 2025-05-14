//permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { Router } from "express";

const rolesRouter = Router();
const rolesRepository = new RolesRepository();

rolesRouter.post("/", (req, res) => {
  const { name } = req.body;
  const roleAlreadyExists = rolesRepository.findByName(name);

  if (roleAlreadyExists) {
    res.status(400).json({ error: 'Role already exists.' })
  }

  const role = rolesRepository.create({ name });

  res.status(200).json({ role });
});

rolesRouter.get("/", (req, res) => {
  const roles = rolesRepository.findAll();

  res.json(roles);
});

export { rolesRouter };
