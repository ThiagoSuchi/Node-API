import Sequelize from "sequelize";
import databaseConfig from "../config/database.js";
import Aluno from "../models/AlunoModel.js";
import User from "../models/UserModel.js";
import Foto from "../models/FotoModel.js";

const models = [Aluno, User, Foto];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
