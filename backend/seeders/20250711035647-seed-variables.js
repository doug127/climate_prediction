/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 */

export async function up(queryInterface, Sequelize) {
  const variablesData = [
    ['Temperatura', '°C'],
    ['Precipitación', 'mm'],
    ['Insolación', 'horas'],
    ['Dirección del viento', '°'],
    ['Velocidad del viento', 'km/h'],
    ['Humedad relativa', '%'],
    ['Radiación solar', 'W/m²'],
    ['Presión atmosférica', 'hPa'],
    ['Evaporación', 'mm'],
  ];

  await queryInterface.bulkInsert('variables',
    variablesData.map(([name, unit]) => ({
      name,
      unit,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  );
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('variables', null, {});
  await queryInterface.sequelize.query(`ALTER SEQUENCE "variables_id_seq" RESTART WITH 1;`);
}
