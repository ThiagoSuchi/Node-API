const HomeModel = require('../models/HomeModel.js')

// HomeModel.create({
//     titulo: 'Primeira coleção',
//     descricao: 'Coleção para testes...'
// })
//   .then(dados => console.log(dados))
//   .catch(err => console.log(err));

exports.paginaInicial = (req, res) => {
    res.send(`
        <form action="/" method="POST">
            Nome do cliente: <input type="text" name="nome">
            <button>Enviar</button>
        </form>    
    `)
}

exports.paginaSecundaria = (req, res) => {
    res.render('index');
    return;
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return;
}