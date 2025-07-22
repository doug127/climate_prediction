/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 */

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('equipment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    serial: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    } 
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('equipment');
};
