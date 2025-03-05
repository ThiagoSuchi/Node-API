const express = require('express');
const app = express();

// express.urlencoded({ extended: true }) serve para interpretar os dados enviados através de um formulário HTML com method="POST", convertendo-os em um objeto JavaScript acessível via req.body.
app.use(express.urlencoded({ extended: true }))

/*
|-----------------------------------------------|
|         criar   | ler   | atualizar | apagar  |     
| CRUD -> CREATE, | READ, | UPDATE,   | DELETE  |
|         POST,   | GET,  | PUT,      | DELETE  |     
|-----------------------------------------------|
*/

app.get('/', (req, res) => {
    res.send(`
    <form action="/" method="POST">
        Nome do cliente: <input type="text" name="nome">
        <button>Enviar</button>
    </form>    
    `)
})

// O ":" indica que é um parâmetro, 
// e o "?" indica que o parâmetro é opcional
app.get('/testes/:profileName?/:profileSenha?', (req, res) => {
    // params - Usado para capturar valores definidos na própria URL
    console.log(req.params);
    // query - Usado para capturados enviados na URL depois do ?
    console.log(req.query);
    res.send([req.params, req.query])
})

app.post('/', (req, res) => {
    // body - Usado para capturar dados enviados no corpo da requisição, geralmente em POST, PUT ou PATCH.
    console.log(req.body);
    res.send(`O formulário foi enviado com sucesso. Oque você enviou foi: ${req.body.nome}` )
})

app.listen(3000, () => {
    console.log('Servidor executando - port: 3000');
    console.log('Acesse >> http://localhost:3000');
});
