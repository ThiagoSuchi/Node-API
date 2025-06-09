import { Request, Response } from "express";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";

export class DeleteRoleController {

  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {};

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.deleteRoleUseCase.execute({ id });

    return res.status(204).send();// 204 - no content
  };
};

