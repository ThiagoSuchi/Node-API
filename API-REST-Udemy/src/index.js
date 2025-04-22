const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express()
app.use(express.json());

const port = 3000

// ------------------------------------------------

const id = uuidv4()
const projects = []

app.get('/projects', (req, res) => {
  return res.json(projects)
})

app.post('/projects', (req, res) => {
    const { name, owner } = req.body
    const project = {
        id: uuidv4(),
        name,
        owner
    };
    projects.push(project)

    // O status code para o método de criação(post), é o 201 -> created
    return res.status(201).json(project)
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