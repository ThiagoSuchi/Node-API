const express = require('express');
const app = express();

/*
|-----------------------------------------------|
|         criar   | ler   | atualizar | apagar  |     
| CRUD -> CREATE, | READ, | UPDATE,   | DELETE  |
|         POST,   | GET,  | PUT,      | DELETE  |     
|-----------------------------------------------|
*/

app.get('/', (req, res) => {
    res.send('Hello <b>World</b>');
}); 

app.get('/contato', (req, res) => {
    res.send(`
    <form action="/" method="POST">
        Nome do cliente: <input name type="text" name="nome">
        <button>Enviar</button>
    </form>    
    `)
})

app.post('/', (req, res) => {
    res.send('O formulário foi enviado com sucesso.')
})

app.listen(3000, () => {
    console.log('Servidor executando - port: 3000');
    console.log('Acesse >> http://localhost:3000');
});
