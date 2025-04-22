const express = require('express');
const app = express()

const port = 3000

app.use(express.json());

app.get('/projects', (req, res) => {
    return res.json([
        'Projeto 1',
        'Projeto 2'
    ])
})

app.post('/projects', (req, res) => {
    const body = req.body
    console.log(body);
    
    return res.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.put('/projects/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    console.log(`O id ${id} foi alterado`);
    console.log(body);

    return res.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.delete('/projects/:id', (req, res) => {
    return res.json([
        'Projeto 1'
    ])
})


app.listen(port, (req, res) => {
    console.log(`O servidor está rodando na porta: http://localhost:${port}`)
})