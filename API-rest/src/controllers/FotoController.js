import multer from "multer";
import multerConfig from "../config/multerConfig.js";
const upload = multer(multerConfig).single('imagem');

import Foto from "../models/FotoModel.js";

class FotoController {
  store(req, res) {
    return upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        })
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body
        const foto = await Foto.create({ originalname, filename, aluno_id })

        res.json(foto);
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          errors: ['Aluno não existe']
        })
      }

    });
  }
}

export default new FotoController();
