import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger.json';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';

import { AppError } from '@shared/utils/errors/AppErro';
import uploadConfig from "@config/upload";
import { routes } from './routes';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));// Rota stática
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes);
app.use(errors());// Detecta erros de validação e interrompe a execução das rotas
app.use(((((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
}) as unknown) as express.ErrorRequestHandler));
/*
Oque o middleware acima faz:
 - Captura erros lançados por throw ou next(error) em qualquer parte da sua aplicação;
 - Responde de forma apropriada, dependendo se é um erro conhecido (AppError) ou não;
 - Silencia o erro de tipagem do TypeScript com as unknown as express.ErrorRequestHandler.
*/

export { app }
