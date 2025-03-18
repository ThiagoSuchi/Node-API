const Contato = require('../models/contatoModel.js')

exports.index = async (req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos });
};