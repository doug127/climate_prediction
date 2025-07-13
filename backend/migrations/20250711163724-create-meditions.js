/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 */

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('meditions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    sensorId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'sensors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    variableId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'variables',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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
  await queryInterface.dropTable('meditions');
} 
