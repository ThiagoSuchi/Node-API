import Aluno from "../models/AlunoModel.js";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos );
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

      const aluno = await Aluno.findByPk(id);

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
