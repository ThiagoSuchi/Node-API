const nome = "Miranda";
const sobrenome = "Jorge";

const falaNome = () => nome + " " + sobrenome

class Pessoa {
    constructor(nome) {
        this.nome = nome
    }
}

// module.exports.nome = nome
// exports.sobrenome = sobrenome
// exports.falaNome = falaNome
// exports.Pessoa = Pessoa
// this.qualquerCoisa = 'Eae, bão?';

// module.exports = function multiplicacao(y, x) {
//     return y * x;
// };


// Ouu posso simplesmente sobrescrever

module.exports = {
    nome,
    sobrenome,
    falaNome,
    Pessoa
}



