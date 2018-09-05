'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pedestrians: {
        type: Sequelize.INTEGER,
      },
      bicycles: {
        type: Sequelize.INTEGER,
      },
      motorbikes: {
        type: Sequelize.INTEGER,
      },
      cars: {
        type: Sequelize.INTEGER,
      },
      lorries: {
        type: Sequelize.INTEGER,
      },
      timestamp: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Records');
  },
};
