import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './models/User.js';

const app = express();

app.use(express.json());

// Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API.' });
});

// Private Route
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não econtrado.' });
    };

    res.status(200).json({ user })
})

// Middleware
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    
    // Por padrão o token vem algo como 'Bearer @iwoefjwm...'
    const token = authHeader && authHeader.split(" ")[1];// isso ignora o 'Bearer' e pega o '@iwoefjwm...'

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado' });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);

        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token inválido' })
    }
}

// Register User
app.post("/auth/register", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ msg: 'Por favor, preencha todos os campos' });
    }

    const { name, email, password, confirmpassword } = req.body;

    // validations
    if (!name || !email || !password) {
        return res.status(422).json({ msg: "O nome, email e senha são obrigatórios." });
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: "As senhas não conferem." });
    }

    // Check user exist
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(422).json({ msg: 'Usuário ja existe, utilize outro e-mail.' })
    }

    // Password hash that will remain in the database
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user in database
    const user = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await user.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso' })

    } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ 
                msg: 'Erro no servidor, tente novamente mais tarde' 
           });
    }
});

// Login User
app.post('/auth/login', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ msg: 'Por favor, preencha todos os campos' });
    };

    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório." });
    };

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória." });
    };

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado.' })
    };

    // Check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    console.log(checkPassword);
    

    if (!checkPassword) {
        return res.status(422).json({ msg: 'A senha está incorreta.' })
    };
    
    // Authentication token - JWT
    try {
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
              id: user._id,
            },
            secret,
        )

        res.status(200).json({ msg: 'Autenticação realizada com sucesso.', token })

    } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ 
                msg: 'Erro no servidor, tente novamente mais tarde' 
           });
    }
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.v60szg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(3000);
        console.log('Conectou ao banco');
    })
    .catch((err) => console.log(err));

