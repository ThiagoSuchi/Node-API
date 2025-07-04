import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUserUseCas";
import { instanceToInstance } from "class-transformer";

export class ListUsresController {
  async handle(req: Request, res: Response): Promise<void> {
    const listUserUseCase = container.resolve(ListUsersUseCase)

    const page = req.query.page && Number(req.query.page) > 0
      ? Number(req.query.page)
      : 1

    const limit = req.query.limit && Number(req.query.limit) > 0
      ? Number(req.query.limit)
      : 15

    const users = await listUserUseCase.execute({ page, limit });
    res.json(instanceToInstance(users))
  }
}
