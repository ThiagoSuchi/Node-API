import Aluno from "../models/AlunoModel.js";
import Foto from "../models/FotoModel.js"
/* "id": 2,
		"nome": "Amanda",
		"sobrenome": "Olívia",
		"email": "amandaPP@gmail.com",
		"idade": 22,
		"peso": 52,
		"altura": 1.59,
*/

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', "nome", "sobrenome", "email", "idade", "peso", "altura"],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['originalname','filename']
      }
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['faltando ID'],
        })
      };

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', "nome", "sobrenome", "email", "idade", "peso", "altura"],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['originalname','filename']
        }
      });

      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não foi encontrado.'],
        })
      };

      return res.json(aluno);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.mesage),
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['faltando ID'],
        })
      };

      const aluno = await Aluno.findByPk(id);

      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não foi encontrado.'],
        })
      };

      await aluno.destroy()
      return res.json({
        apagado: true,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.mesage),
      })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['faltando ID'],
        })
      };

      const aluno = await Aluno.findByPk(id);

      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não foi encontrado.'],
        })
      };

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.mesage),
      })
    }
  }

};

export default new AlunoController();
