import User from "../models/UserModel.js";

class HomeController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body)
      res.json(novoUser);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errors: err.errors.map((err) => err.message)
      });
    }

  }
}

export default new HomeController();
