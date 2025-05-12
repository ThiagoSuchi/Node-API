import { Router } from "express"; //permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { v4 as uuidv4 } from "uuid";

const rolesRouter = Router();

const roles = []

rolesRouter.post("/", (req, res) => {
  const { name } = req.body;

  const role = {
    id: uuidv4(),
    name,
    created_at: new Date(),
  };

  roles.push(role);

  res.status(200).json({ role });
});

export { rolesRouter }
