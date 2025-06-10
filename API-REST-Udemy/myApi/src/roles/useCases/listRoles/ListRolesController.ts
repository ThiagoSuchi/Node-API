import { Request, Response } from "express";
import { ListRolesUseCase } from "./ListRolesUseCase";
import { container } from "tsyringe";

export class ListRolesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRolesUseCase = container.resolve(ListRolesUseCase)

    const page = req.query.page && Number(req.query.page) > 0
      ? Number(req.query.page)
      : 1

    const limit = req.query.limit && Number(req.query.limit) > 0
      ? Number(req.query.limit)
      : 15

    const roles = await listRolesUseCase.execute({ page, limit });
    return res.json(roles)
  }
}
