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

// O express-session é um middleware que armazena informações da sessão do usuário no servidor em vez de armazená-las no navegador como cookies.
const session = require('express-session');
// O connect-mongo é uma extensão do express-session que permite salvar as sessões no MongoDB em vez de armazená-las na memória do servidor.
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const csrf = require('csurf');
const routes = require('./routes.js');
const path = require('path');
const { meuMiddlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware.js')

//la permite que o Express interprete dados enviados via formulários HTML no formato URL-encoded e os transforme em um objeto JavaScript acessível via req.body.
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(helmet());

const sessionOptions = session({
  secret: 'Testando...',
  store: new MongoStore({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions)

app.set('views', path.resolve(__dirname, 'src', 'views'));
// View engine (motor de renderização de templates)
app.set('view engine', 'ejs');

app.use(csrf());
// Nossos próprios middlewares
app.use(meuMiddlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {// Captura o evento 'pronto', e inicia a função.
    app.listen(3100, () => {
        console.log('Acessar => http://localhost:3100');
    });
})
