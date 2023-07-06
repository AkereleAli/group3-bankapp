const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Otp = sequelize.define('otp',
    {
        sn: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },

        otp_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
                },
        otp:{
            type: DataTypes.STRING,
            allowNull: false,
            },
        email_or_phone:{
                        type: DataTypes.STRING,
                        allowNull: false,
                       },
        otp_type:{
                  type: DataTypes.STRING,
                  allowNull: false,
                  defaultValue: 0
                 }

    }

)


module.exports = Otp