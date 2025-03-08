// Importando a conexão do mongoDB Atlas, que está no arquivo .env
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conectando ao Banco de Dados Atlas
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log('>> Conectado ao Banco de Dados Atlas <<')
    app.emit('pronto')// Emite um evento chamado 'pronto'
  })
  .catch(err => console.error(err));

const routes = require('./routes.js');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware.js')

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views'));
// View engine (motor de renderização de templates)
app.set('view engine', 'ejs');

app.use(meuMiddleware);
app.use(routes);

app.on('pronto', () => {// Captura o evento 'pronto', e inicia a função.
    app.listen(3000, () => {
        console.log('Acessar => http://localhost:3000');
    });
})
