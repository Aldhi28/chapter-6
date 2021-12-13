'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rooms', { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        winner:  {
          type: Sequelize.STRING,
          allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
          type: Sequelize.DATE,
          defaultValue: new Date()
      },
      deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
      }
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rooms');
  }
};
