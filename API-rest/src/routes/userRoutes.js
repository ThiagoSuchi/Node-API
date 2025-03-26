import { Router } from "express";
import userController from "../controllers/UserController.js"

import loginRequired from "../middlewares/lognRequired.js";

const router = new Router();

router.post('/', userController.store);
router.get('/', loginRequired, userController.index);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
