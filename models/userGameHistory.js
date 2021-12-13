const sequelize = require('./sequelize');
const { Model, DataTypes } = require("sequelize");

class userGameHistory extends Model {}

userGameHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        player_1: {
            type: DataTypes.ENUM('batu','kertas','gunting'),
            allowNull: true
        },
        player_2: {
            type: DataTypes.ENUM('batu','kertas','gunting'),
            allowNull: true
        },
        user_1: {
            type: DataTypes.INTEGER ,
            allowNull: true
        },
        user_2: {
            type:  DataTypes.INTEGER,
            allowNull: true
        },
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        winner: {
            type:  DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "userGameHistory",
        modelName: 'userGameHistory',
        timestamps: true,
        paranoid: true
    }
);

module.exports = userGameHistory;