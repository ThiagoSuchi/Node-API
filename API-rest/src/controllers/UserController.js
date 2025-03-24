import User from "../models/UserModel.js";

class HomeController {
  async store(req, res) {
    const novoUser = await User.create({
      nome: 'George',
      email: 'leleONCIO@gmail.com',
      password: '12345678'
    })
    res.json(novoUser);
  }
}

export default new HomeController();
