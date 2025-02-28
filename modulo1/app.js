const { nome, sobrenome, falaNome, Pessoa } = require('./mod1');
// const multiplicacao = require('./mod1');

const p1 = new Pessoa('Maria Lúcia');

console.log(nome,"\n",sobrenome,"\n",falaNome(),"\n",p1.nome);
// console.log(multiplicacao(2, 4));
