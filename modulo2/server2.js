const express = require('express');
const app = express();
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

app.listen(3000, () => {
    console.log('Acessar >> http://localhost:3000');
});