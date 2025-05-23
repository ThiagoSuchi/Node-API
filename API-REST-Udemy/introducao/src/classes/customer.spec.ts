import { IndividualCustomer, EnterpriseCustomer } from "./customer";

const createIndividualCustomer = (
    firstName: string,
    lastName: string,
    cpf: string
): IndividualCustomer => {
    return new IndividualCustomer(firstName, lastName, cpf);
}

const createEnterpriseCustomer = (
    firstName: string,
    cnpj: string
): EnterpriseCustomer => {
    return new EnterpriseCustomer(firstName, cnpj);
}

afterEach(() => jest.clearAllMocks());

describe('IndividualCustomer', () => {
    it('should have firstName, lastName and cpf', () => {
        const sut = createIndividualCustomer('Larissa', 'Da Silva', '765-832.156.54');
        expect(sut).toHaveProperty('firstName', 'Larissa');
        expect(sut).toHaveProperty('lastName', 'Da Silva');
        expect(sut).toHaveProperty('cpf', '765-832.156.54');
    });

    it('should have methods to get name and idn', () => {
        const sut = createIndividualCustomer('Larissa', 'Da Silva', '765-832.156.54');
        expect(sut.getName()).toBe('Larissa Da Silva');
        expect(sut.getIDN()).toBe('765-832.156.54');
    });
});

describe('EnterpriseC', () => {
    it('should have firstName, lastName and cpf', () => {
        const sut = createIndividualCustomer('Larissa', 'Da Silva', '765-832.156.54');
        expect(sut).toHaveProperty('firstName', 'Larissa');
        expect(sut).toHaveProperty('lastName', 'Da Silva');
        expect(sut).toHaveProperty('cpf', '765-832.156.54');
    });

    it('should have methods to get name and idn', () => {
        const sut = createIndividualCustomer('Larissa', 'Da Silva', '765-832.156.54');
        expect(sut.getName()).toBe('Larissa Da Silva');
        expect(sut.getIDN()).toBe('765-832.156.54');
    });
});