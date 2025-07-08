import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowProfileUseCase } from "./ShowProfileUserUseCase";
import { instanceToInstance } from "class-transformer";
import { AppError } from "@shared/utils/errors/AppErro";

export class ShowProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const showProfileUseCase = container.resolve(ShowProfileUseCase);
      const userId = req.user.id;

      const user = await showProfileUseCase.execute({ userId });

      return res.json(instanceToInstance(user));
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
