import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    })
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        id,
        email,
      }
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido.']
      })
    }

    req.userId = id;
    req.userEmail = email;
    return next()

  } catch (err) {
    console.log(err);
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    })
  }
}
