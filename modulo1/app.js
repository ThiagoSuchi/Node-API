const { nome, sobrenome, falaNome, Pessoa, multiplicacao } = require('./mod1');

const p1 = new Pessoa('Maria Lúcia');

console.log(nome,"\n",sobrenome,"\n",falaNome(),"\n",p1.nome,"\n", multiplicacao(2, 5));