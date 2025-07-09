import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProfileUseCase } from "./UpdateProfileUseCase";
import { AppError } from "@shared/utils/errors/AppErro";

export class UpdateProfileController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const updateProfileUseCase = container.resolve(UpdateProfileUseCase);
      const userId = req.user.id;
      const { name, email, password, old_password } = req.body;

      const user = await updateProfileUseCase.execute({
        userId,
        name,
        email,
        password,
        old_password
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
