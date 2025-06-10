import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

export class CreateRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createRoleUseCase = container.resolve(CreateRoleUseCase)

    const { name } = req.body;
    const role = await createRoleUseCase.execute({ name });

    return res.status(200).json({ role });
  };
};
