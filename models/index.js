const User = require('./users.model')
const UserRole = require('./userRoles.models')
const Room = require("./roomsModel")
const UserGameHistory = require("./userGameHistory")
const sequelize = require('./sequelize')
const Sequelize = require('sequelize')
const { user } = require('pg/lib/defaults')

User.hasOne(UserRole, {
    as: 'role',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

UserRole.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = {
    User,
    UserRole,
    Room,
    UserGameHistory,
    sequelize,
    Sequelize
}