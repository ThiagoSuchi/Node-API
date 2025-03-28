import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// Middleware para verificar se o usuário está logado
export default async (req, res, next) => {
  const { authorization } = req.headers; // Extrai o cabeçalho de autorização da requisição

  // Se nenhum cabeçalho de autorização estiver presente, retorna um erro
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  // Extrai o token do cabeçalho de autorização
  const [, token] = authorization.split(' ');

  try {
    // Verifica o token e extrai os dados do usuário
    const dados = jwt.verify(token, process.env.TOKEN_SECRET); // Valida o token usando a chave secreta
    const { id, email } = dados; // Desestrutura o ID e o email do usuário do payload do token

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido.'],
      });
    }

    // Anexa as informações do usuário ao objeto da requisição para uso posterior
    req.userId = id;
    req.userEmail = email;
    return next();

  } catch (err) {
    console.log(err);
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
