import { Request, Response } from "express";
import { ShowRoleUseCase } from "./ShowRoleUseCase";
import { container } from "tsyringe";

export class ShowRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const showRoleUseCase = container.resolve(ShowRoleUseCase)

    const { id } = req.params;
    const role = await showRoleUseCase.execute({ id });

    return res.status(200).json({ role });
  }
}

