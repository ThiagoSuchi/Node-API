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
}

exports.trataPost = (req, res) => {
    res.send("Ei, você acabou de enviar um formulário.")
}