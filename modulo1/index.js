const fs = require('fs').promises;
const path = require('path');

async function readdir(rootDir) {
    rootDir = rootDir || path.resolve(__dirname); // Se rootDir tiver caminho retorna o caminho, se não retorna o caminho absoluto onde está o arquivo principal.
    const files = await fs.readdir(rootDir); // o método readdir() é usado para ler o conteúdo de um diretório.
    walk(files, rootDir);
}

async function walk(files, rootDir) {

    for (let file of files) {
        const fileFullPath = path.resolve(rootDir, file);
        
        // fs.stat(fileFullPath) retorna um objeto contendo informações sobre o arquivo ou diretório (tamanho, permissões, se é um diretório ou arquivo, etc.).
        const stats = await fs.stat(fileFullPath);

        if (stats.isDirectory()) {
            readdir(fileFullPath)
            continue
        };

        console.log(fileFullPath, stats.isDirectory());
    }
}

readdir('./')

// O módulo fs (File System) é usado para manipular arquivos e diretórios do sistema de arquivos. 
// Ele permite ler, escrever, excluir, renomear e modificar arquivos e diretórios.