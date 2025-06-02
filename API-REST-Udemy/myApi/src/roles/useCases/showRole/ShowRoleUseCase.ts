import { Request, Response } from "express";
import { ShowRoleUseCase } from "./ShowRoleController";

export class ShowRoleController {

  constructor(private showRoleUseCase: ShowRoleUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const role = await this.showRoleUseCase.execute({ id });

    return res.status(200).json({ role });
  }
}
