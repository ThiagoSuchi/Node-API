const fs = require('fs').promises;
const path = require('path');
const caminhoArquivo = path.resolve(__dirname, '../data', 'teste.json');
const caminhoArquivo2 = path.resolve(__dirname, '../data', 'teste.txt');

const pessoas = [
    {nome: 'joão'},
    {nome: 'Thalles'},
    {nome: 'Luana'},
    {nome: 'Marta'}
];

const json = JSON.stringify(pessoas, '', 2)

fs.writeFile(caminhoArquivo, json, { flag: 'w' }); // O flag: 'w' - apaga tudo que ja estiver no arquivo(CASO ELE JA EXISTA)    

fs.writeFile(caminhoArquivo2, 'Testando FS com o método fs.write(), teste 1', { flag: 'w' });