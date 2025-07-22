/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 */

export async function up (queryInterface, Sequelize) {
  const momentsData = [
    '00:00', '01:00', '02:00', '03:00', '04:00',
    '05:00', '06:00', '07:00', '08:00', '09:00',
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00',
  ];

  await queryInterface.bulkInsert('moments', momentsData.map(hour => ({
    hour,
    createdAt: new Date(),
    updatedAt: new Date()
  })));
}

export async function down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('moments', null, {});
    await queryInterface.sequelize.query(`ALTER SEQUENCE "moments_id_seq" RESTART WITH 1;`);
};
