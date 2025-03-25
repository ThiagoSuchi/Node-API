import { Router } from "express";
import tokenController from "../controllers/TokenController.js"

const router = new Router();

router.post('/', tokenController.store);

export default router;
