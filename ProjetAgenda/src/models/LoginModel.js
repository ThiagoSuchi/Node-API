const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.errors.push('usuário não existe.');
      return;
    }

    // Validando a senha usando o bcrypt
    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida.');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if(this.errors.length > 0) return;
    
    this.userExists();
    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();// Gera um salt, que é um valor aleatório usado para fortalecer a criptografia.
    this.body.password = bcryptjs.hashSync(this.body.password, salt);// O salt é adicionado ao hash para codificar a senha.

    this.user = await LoginModel.create(this.body);// Criação do usuário
  }

  // Verifica se o usuário já existe.
  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email })
    if(this.user) this.errors.push('Usuário ja existe');
  }

  // Valida os campos email e senha
  valida() {
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    
    if(this.body.password.length < 4 || this.body.password.length > 20) {
      this.errors.push('A senha precisa ter entre 4 e 20 caracteres.');
    }
  }

  // Limpa o objeto recebido no body, com o íntuito de verificar se os valores dos campos são do tipo string
  cleanUp() { 
    for(const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login;