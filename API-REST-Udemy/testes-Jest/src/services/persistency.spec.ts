import { Persistency } from "./persistency";

describe('Persistency', () => {
    // afterEach: é um gancho (hook) do Jest que executa o código dentro dele após cada teste
    // jest.clearAllMocks(): é uma função do Jest que limpa todos os mocks, spies e stubs
    afterEach(() => jest.clearAllMocks());

    it('should return undefined', () => {
        // SUT - System Under Test (Sistema que está sendo testado)
        const sut = new Persistency();
        expect(sut.saveOrder()).toBeUndefined();
    });

    it('should call console.log once', () => {
        const sut = new Persistency();
        
        // Usa o Jest para “espionar” o método console.log.
        const consoleSpy = jest.spyOn(console, 'log');
        sut.saveOrder();

        // Verifica se o método console.log foi chamado exatamente uma vez durante a execução do teste.
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    })

      it('should call console.log with "Pedido salvo com sucesso..."', () => {
        const sut = new Persistency();
        
        const consoleSpy = jest.spyOn(console, 'log');
        sut.saveOrder();

        // .toHaveBeenCalledWith(...): é uma asserção que verifica se a função foi chamada com aquele argumento exato.
        expect(consoleSpy).toHaveBeenCalledWith('Pedido salvo com sucesso...');
    })
});