const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')


const banks = sequelize.define('bank',
{
    sn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },

    bank_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },

    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    bank_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    bank_account_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    account_name: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = banks