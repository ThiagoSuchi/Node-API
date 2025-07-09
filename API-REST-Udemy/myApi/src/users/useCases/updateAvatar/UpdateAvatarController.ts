import { container } from "tsyringe";
import { Request, Response } from "express";

import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";
import { instanceToInstance } from "class-transformer";
import { AppError } from "@shared/utils/errors/AppErro";

export class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      console.log('=== UPDATE AVATAR START ===');
      console.log('File:', req.file);
      console.log('User ID:', req.user?.id);

      // Verificar se o arquivo foi enviado
      if (!req.file) {
        res.status(400).json({
          status: 'error',
          message: 'Avatar file is required'
        });
        return;
      }

      // Verificar se o usuário está autenticado
      if (!req.user || !req.user.id) {
        res.status(401).json({
          status: 'error',
          message: 'User authentication required'
        });
        return;
      }

      const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);
      const user = await updateAvatarUseCase.execute({
        userId: req.user.id,
        avatarFileName: req.file.filename,
      });

      console.log('Avatar updated successfully:', user.avatar);
      res.json(instanceToInstance(user));
    } catch (error) {
      console.error('Update avatar error:', error);

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
