require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER_NAME,
    process.env.DATABASE_PASSWORD, 
    {
        host: process.env.DATABASE_HOST,
        port:3306,
        dialect: 'mysql'
    }
)


module.exports = sequelize;