import { AppError } from "@shared/errors/AppErro";
import { Router } from "express"; //permite criar grupos de rotas em arquivos separados e, então, importar essas rotas para o arquivo principal

const routes = Router();

routes.get('/', (req, res) => {
  throw new AppError("Acesso negado.")
  res.json({ message: 'Hello World!!' });
});

export { routes };
