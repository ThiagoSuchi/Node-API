const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: { type: String, require: true },// O título precisa ser enviado, caso contrário ele retornara um erro
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;
