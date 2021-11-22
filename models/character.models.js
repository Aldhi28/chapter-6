const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequalize')

class addcharacter extends Model {}

Model.init({
    id:{ 
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Character:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Weapon:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Skill:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Addcharacter',
    timestamps: false,
})

module.exports = addcharacter