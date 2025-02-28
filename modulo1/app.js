const { nome, sobrenome, falaNome, Pessoa } = require('./mod1');
// const multiplicacao = require('./mod1');

const p1 = new Pessoa('Maria Lúcia');

console.log(nome,"\n",sobrenome,"\n",falaNome(),"\n",p1.nome);
// console.log(multiplicacao(2, 4));

// ---------------------------------- Write and Read (FileSystem) ----------------------------------------------------

const ler = require('./readFs');
const path = require('path');
const caminhoArquivo = path.resolve(__dirname, '../data', 'teste.json');
const caminhoArquivo2 = path.resolve(__dirname, '../data', 'teste.txt');

// Lendo arquivo Json
async function lerArquivoJson(caminho) {
    const dados = await ler(caminho);
    renderDados(dados)
};

function renderDados(dados) {
    dados = JSON.parse(dados);
    dados.forEach(val => console.log(val));
}

// Lendo arquivo txt
async function lerArquivoText(caminho) {
    const dados = await ler(caminho);
    return dados
};

// Lendo arquivo Json
lerArquivoJson(caminhoArquivo);

// Lendo arquivo txt
lerArquivoText(caminhoArquivo2)
    .then(dados => console.log(dados))
    .catch(err => console.log(err))


