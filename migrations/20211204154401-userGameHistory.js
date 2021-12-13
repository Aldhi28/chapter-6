'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userGameHistory', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    player_1: {
        type: Sequelize.ENUM('batu','kertas','gunting'),
        allowNull: true
    },
    player_2: {
        type: Sequelize.ENUM('batu','kertas','gunting'),
        allowNull: true
    },
    user_1: {
      type: Sequelize.INTEGER ,
      allowNull: true,
      references: {
        model: "users",
        key: "id"
      },
  },
  user_2: {
      type:  Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id"
      },
  },
    roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "rooms",
          key: "id"
        },
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
    await queryInterface.dropTable('userGameHistory');
  }
};
