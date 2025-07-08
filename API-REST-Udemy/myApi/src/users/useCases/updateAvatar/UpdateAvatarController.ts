import { container } from "tsyringe";
import { Request, Response } from "express";

import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";
import { instanceToInstance } from "class-transformer";
import { AppError } from "@shared/utils/errors/AppErro";

export class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);
      const user = await updateAvatarUseCase.execute({
        userId: req.user.id,
        avatarFileName: req.file.filename,
      });

      res.json(instanceToInstance(user));
    } catch (error) {
      console.error('Create user error:', error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          status: 'error',
          message: error.message
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
}
