import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { instanceToInstance } from "class-transformer";
import { AppError } from "@shared/utils/errors/AppErro";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      const { name, email, isAdmin, password, roleId } = req.body;

      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        isAdmin,
        roleId
      });

      res.status(201).json(instanceToInstance(user));
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
