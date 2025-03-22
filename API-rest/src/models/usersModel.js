import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

// Configuração do prórprio sequelize
export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',// Se o usuário não fornecer um valor ao criar um registro, o campo será preenchido com uma string vazia.
        validate: {
          len: {// Valida o comprimento do valor inserido no campo.
            args: [4, 30],
            msg: 'Campo nome deve conter entre 4 a 30 caracteres.'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Este email é inválido.'
          }
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 15],
            msg: 'Campo senha deve conter entre 8 a 15 caracteres.'
          }
        }
      },
    }, {
      sequelize,
    })

    // Antes de salvar(beforeSave) um registro no banco de dados, este hook substitui a senha por uma versão criptografada.
    this.addHook('beforeSave', async user => {
      user.password_hash = await bcrypt.hash(user.password, 8);
    });
    // OBS: os hooks são "middlewares" de um ORM, que são nativos da lib Sequelize.

    return this;
  }
}
