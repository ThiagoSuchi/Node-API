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

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const routes = require('./routes.js');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware.js')

//la permite que o Express interprete dados enviados via formulários HTML no formato URL-encoded e os transforme em um objeto JavaScript acessível via req.body.
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
  secret: 'Opa este campo só eu sei...',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions)
app.use(flash());

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
