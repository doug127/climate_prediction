/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 */

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('sensors', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true
    },
    code: {
      type: Sequelize.CHAR(4),
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
    equipmentId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'equipment',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('sensors');
};