import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsresController } from "@users/useCases/listUsers/ListUsersController";

const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsresController);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    }
  }), (req, res) => {
    return createUserController.handle(req, res);
  })

usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      limit: Joi.number()
    }
  }), (req, res) => {
    return listUsersController.handle(req, res);
  })

export { usersRouter };
