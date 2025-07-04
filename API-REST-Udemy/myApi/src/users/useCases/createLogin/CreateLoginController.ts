import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateLoginUseCase } from './CreateLoginUseCase'
import { AppError } from '@shared/utils/errors/AppErro'

export class CreateLoginController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const createLoginUseCase = container.resolve(CreateLoginUseCase);
      const { email, password } = req.body;

      const { user, token } = await createLoginUseCase.execute({
        email,
        password,
      });

      console.log('Login successful, returning response');
      res.status(201).json(
        instanceToInstance({
          user,
          token
        })
      );
    } catch (error) {
      console.error('Login error:', error);

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
