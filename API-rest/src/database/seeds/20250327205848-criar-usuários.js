const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [{
      nome: 'Ananda Díaz',
      email: 'anandadiaz@gmail.com',
      password_hash: await bcrypt.hash('12345678', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'João Lopes',
      email: 'jaozin@gmail.com',
      password_hash: await bcrypt.hash('12345678', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'Guilherme Dantas',
      email: 'guilherm3@gmail.com',
      password_hash: await bcrypt.hash('12345678', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'Sofia Hurosky',
      email: 'sosohurosky@gmail.com',
      password_hash: await bcrypt.hash('12345678', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  // async down () => {},
};
