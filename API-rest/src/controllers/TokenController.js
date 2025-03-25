import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas.']
      });
    };

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não encontrado.']
      });
    };

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida.']
      });
    }

    // Aqui é criado um token para o user, para ele poder acessar áreas protegidas da aplicação
    const { id } = user
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.json({ token });
  }
}

export default new TokenController();
