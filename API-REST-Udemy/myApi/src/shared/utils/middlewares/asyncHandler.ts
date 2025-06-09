import { Request, Response, NextFunction, RequestHandler } from 'express';

// Função que retorna um middleware do express que trata erros em funções assíncronas
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
