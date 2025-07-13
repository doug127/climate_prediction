/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 */

export async function up (queryInterface, Sequelize) {
  const equipmentData = [
    'serial-anemometro',
    'serial-barometro',
    'serial-pluviometro',
    'serial-temp',
    'serial-veleta'
  ];

  await queryInterface.bulkInsert('equipment', equipmentData.map(serial => ({
    serial,
    createdAt: new Date(),
    updatedAt: new Date()
  })));
}

export async function down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('equipment', null, {});
  await queryInterface.sequelize.query(`ALTER SEQUENCE "equipment_id_seq" RESTART WITH 1;`);

}

