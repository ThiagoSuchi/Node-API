import Sequelize from "sequelize";
import databaseConfig from "../config/database.js";
import Aluno from "../models/AlunoModel.js";
import User from "../models/UserModel.js";

const models = [Aluno, User];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
