import { Router } from "express";
import userController from "../controllers/UserController.js"

import loginRequired from "../middlewares/lognRequired.js";

const router = new Router();

// Em uma aplicação essas rotas não existiriam
router.get('/', userController.index);
router.get('/:id', userController.show);

router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
