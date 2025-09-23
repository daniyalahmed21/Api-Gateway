/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  // Insert roles
  await queryInterface.bulkInsert('Roles', [
    {
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'flight-company',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  // Delete roles
  await queryInterface.bulkDelete('Roles', null, {});
}
