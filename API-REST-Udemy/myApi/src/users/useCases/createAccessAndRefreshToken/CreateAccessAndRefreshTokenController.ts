import { container } from "tsyringe";
import { CreateAccessAndRefreshTokenUseCase } from "./CreateAccessAndRefreshTokenUseCase";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import { AppError } from "@shared/utils/errors/AppErro";

export class CreateAccessAndRefreshTokenController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const createAccessAndRefreshToken = container.resolve(CreateAccessAndRefreshTokenUseCase);
      const user_id = req.user.id;
      const { refresh_token } = req.body;

      const { user, accessToken, refreshToken} = 
      await createAccessAndRefreshToken.execute({
        user_id,
        refresh_token,
      });

      res.status(201).json(
        instanceToInstance({
          user,
          accessToken,
          refreshToken
        })
      );

    } catch (error) {
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
