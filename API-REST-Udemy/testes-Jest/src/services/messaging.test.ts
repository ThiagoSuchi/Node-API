import { Persistency } from "./persistency";
import { Messaging } from "./messaging";

const createSut = () => {
    return new Messaging();
}

describe('Messaging', () => {
    // afterEach: é um gancho (hook) do Jest que executa o código dentro dele após cada teste
    // jest.clearAllMocks(): é uma função do Jest que limpa todos os mocks, spies e stubs
    afterEach(() => jest.clearAllMocks());

    it('should return undefined', () => {
        // SUT - System Under Test (Sistema que está sendo testado)
        const sut = createSut();
        expect(sut.sendMessage('teste')).toBeUndefined();
    });

    it('should call console.log once', () => {
        const sut = createSut();
        
        // Usa o Jest para “espionar” o método console.log.
        const consoleSpy = jest.spyOn(console, 'log');
        sut.sendMessage('teste');

        // Verifica se o método console.log foi chamado exatamente uma vez durante a execução do teste.
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    })

      it('should call console.log with "Mensagem enviada:"', () => {
        const sut = createSut();
        
        const consoleSpy = jest.spyOn(console, 'log');
        sut.sendMessage('Testando');

        // .toHaveBeenCalledWith(...): é uma asserção que verifica se a função foi chamada com aquele argumento exato.
        expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada:', 'Testando');
    })
});