import { Router } from "express";
import multer from "multer";

import fotoController from "../controllers/FotoController.js"
import multerConfig from "../config/multerConfig.js";

const upload = multer(multerConfig);
const router = new Router();

router.post('/',upload.single('imagem'), fotoController.store);

export default router;
