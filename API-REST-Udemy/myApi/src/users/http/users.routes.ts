import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";
import multer from "multer";

import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticator";
import uploadConfig from "@config/upload";
import { UpdateAvatarController } from "@users/useCases/updateAvatar/UpdateAvatarController";
import { ShowProfileController } from "@users/useCases/showProfile/ShowProfileController";

const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const updateAvatarController = container.resolve(UpdateAvatarController);
const showProfilecontroller = container.resolve(ShowProfileController);

const upload = multer(uploadConfig);

usersRouter
  .post(
    '/',
    isAuthenticated,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean().required(),
        roleId: Joi.string().uuid().required(),
      }
    }), createUserController.handle.bind(createUserController))
  .get(
    '/',
    isAuthenticated,
    celebrate({
      [Segments.QUERY]: {
        page: Joi.number(),
        limit: Joi.number()
      }
    }, { convert: true }),
    listUsersController.handle.bind(listUsersController)
  )
  .post(
    '/login',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }
    }), createLoginController.handle.bind(createLoginController)
  )
  .patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    updateAvatarController.handle.bind(updateAvatarController)
  )
  .get(
    '/profile',
    isAuthenticated,
    showProfilecontroller.handle.bind(showProfilecontroller)
  )

export { usersRouter };
