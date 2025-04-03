import Sequelize, { Model } from "sequelize";

// Configuração do prórprio sequelize
export default class Foto extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio.'
          }
        }
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio'
          }
        }
      },

    }, {
      sequelize,
      tableName: 'fotos',
    })
    return this;
  }

  static associate(models) { // Chave estrangeira
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}
