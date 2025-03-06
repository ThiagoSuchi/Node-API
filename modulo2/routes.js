const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController.js')
const contatoController = require('./src/controllers/contatoController.js')

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// Rotas segunda página
route.get('/outraPagina', homeController.paginaSecundaria);

// Rota do contato
route.get('/contato', contatoController.paginaInicial);

module.exports = route;