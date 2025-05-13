import { Role } from "@roles/entities/Role";

//permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { Router } from "express";

const rolesRouter = Router();

const roles = []

rolesRouter.post("/", (req, res) => {
  const { name } = req.body;

  const role = new Role();

  // Object.assign() serve para juntar dois ou mais objetos em um só.
  // É como fazer um merge (fusão) de objetos.
  Object.assign(role, {
    name,
    created_at: new Date()
  })

  roles.push(role);

  res.status(200).json({ role });
});

export { rolesRouter }
