const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express()
app.use(express.json());

const port = 3000

// ------------------------------------------------

const id = uuidv4()
const projects = []

// Middleware
function logRoutes(req, res, next) {
    const { method, url } = req
    const route = `[${method.toUpperCase()}] ${url}`
    
    console.log(route);
    return next()
}

// Para se usar um middleware
app.use(logRoutes)

// Ou um middleware pode ser usado de maneira isolada
app.get('/projects', logRoutes, (req, res) => {
  return res.json(projects)
})

app.post('/projects', (req, res) => {
    const { name, owner } = req.body
    const project = {
        id: id,
        name,
        owner
    };
    projects.push(project)

    // O status code para o método de criação(post), é o 201 -> created
    return res.status(201).json(project)
})

app.put('/projects/:id', (req, res) => {
    const { id } = req.params
    const { name, owner } = req.body

    const projectIndex = projects.findIndex(item => item.id === id)

    if (projectIndex === -1) {
        return res.status(404).json({ error: 'Projeto não encontrado.' })
    }

    if (!name || !owner) {
        return res.status(400).json({ error: 'Nome do projeto e proprietário são requeridos.' })
    }

    const project = {
        id,
        name,
        owner
    }

    projects[projectIndex] = project

    return res.json({ message: `Projeto do usuário ${owner}, atualizado com sucesso.`})
})

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params
    
    const projectIndex = projects.findIndex(item => item.id === id)

    if (projectIndex === -1) {
        return res.status(404).json({ error: 'Projeto não encontrado.' })
    }

    projects.splice(projectIndex, 1)

    return res.status(204).send()
})


app.listen(port, (req, res) => {
    console.log(`O servidor está rodando na porta: http://localhost:${port}`)
})