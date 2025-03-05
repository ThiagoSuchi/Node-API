const express = require('express');
const route = express.Router();
const homeController = require('./controllers/homeController.js')
const contatoController = require('./controllers/contatoController.js')

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

route.get('/contato', contatoController.paginaInicial);

module.exports = route;