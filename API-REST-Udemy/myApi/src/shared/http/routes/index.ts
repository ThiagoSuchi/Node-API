import { AppError } from "@shared/errors/AppErro";
import { Router } from "express"; //permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal
import { rolesRouter } from "@roles/http/routes/roles.routes";

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello World!!' });
});

routes.use('/roles', rolesRouter);

export { routes };
