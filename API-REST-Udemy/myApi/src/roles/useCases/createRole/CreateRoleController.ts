import { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

export class CreateRoleController {

  constructor(private createRoleUseCase: CreateRoleUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name } = req.body;
    const role = this.createRoleUseCase.execute({ name });

    return res.status(200).json({ role });
  }
}
