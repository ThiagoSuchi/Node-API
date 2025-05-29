import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import cors from 'cors';
import { AppError } from '@shared/errors/AppErro';
import swaggerFile from 'swagger.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)

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
