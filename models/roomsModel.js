const sequelize = require('./sequelize');
const { Model, DataTypes } = require("sequelize");

class Room extends Model {}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        winner: {
            type:  DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "rooms",
        modelName: 'rooms',
        timestamps: true,
        paranoid: true
    }
);

module.exports = Room;