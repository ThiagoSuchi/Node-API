import { Request, Response } from "express";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";
import { container } from "tsyringe";

export class DeleteRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const deleteRoleUseCase = container.resolve(DeleteRoleUseCase);

    const { id } = req.params;
    await deleteRoleUseCase.execute({ id });

    return res.status(204).send();// 204 - no content
  };
};

