// O describe() serve para agrupar testes relacionados, deixando tudo mais organizado.
describe('Primitive values', () => {
    // O it() é uma função que define um teste individual.
    it('should test jest assertions', () => {
        const number = 10;

        expect(number).toBe(10);// Compara por valores primitivos

        expect(number).not.toBeNull();// Não pode ser nulo

        expect(number).toBeGreaterThan(9);// Maior que
        expect(number).toBeGreaterThanOrEqual(10)// Maior ou igual
        expect(number).toBeLessThan(11);// Menor que
        expect(number).toBeLessThanOrEqual(10)// Menor ou igual

        // cálculos com números quebrados, sempre use .toBeCloseTo() para evitar bugs nos testes 
        expect(number).toBeCloseTo(10, 1);// O I parametro é o valor, o II é a quantidade de casa decimal quer checkar
        expect(number).toBeNull();
    });
});

describe('Objects', () => {
    it('Should test jest assertions with objects', () => {
        const person = { name: 'Thiago', age: 23 };
        const anotherPerson = { ...person };

        expect(person).toEqual(anotherPerson);// Comparação mais complexa: objetos, funções, arrays, etc.
        expect(person).toHaveProperty('age');
        expect(person).toHaveProperty('age', 29);

        expect(person.name).toBe('Thiago');
    })
})