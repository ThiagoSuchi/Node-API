import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";
import { instanceToInstance } from "class-transformer";
import { AppError } from "@shared/utils/errors/AppErro";

export class ListUsersController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const listUserUseCase = container.resolve(ListUsersUseCase)

      const page = req.query.page && Number(req.query.page) > 0
        ? Number(req.query.page)
        : 1

      const limit = req.query.limit && Number(req.query.limit) > 0
        ? Number(req.query.limit)
        : 15

      const users = await listUserUseCase.execute({ page, limit });
      res.json(instanceToInstance(users))
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          status: 'error',
          message: error.message
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Erro interno do servidor'
        });
      }
    }
  }
}
