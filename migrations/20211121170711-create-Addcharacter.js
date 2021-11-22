'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addcharacter', { 
      id:{ 
         type: Sequelize.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true
       },
       Character:{
         type: Sequelize.STRING,
         allowNull: false
       },
       Gender:{
         type: Sequelize.STRING,
         allowNull: false
       },
       Weapon:{
         type: Sequelize.STRING,
         allowNull: false
       },
       Skill:{
         type: Sequelize.STRING,
         allowNull: false
       }
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addcharacter');
  }
};
