import Aluno from "../models/alunoModel";

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'George',
      sobrenome: 'Leoncio',
      email: 'leleONCIO@gmail.com',
      idade: 26,
      peso: 83,
      altura: 1.86,
    })
    res.json(novoAluno);
  }
}

export default new HomeController();
