const {Sequelize} = require('sequelize')
require("dotenv").config()
module.exports = new Sequelize(
    //  process.env.DB_NAME, //название бд
    //  process.env.DB_USER, //пользователь
    //  process.env.DB_PASSWORD, //Пароль
    "online_store", "postgres", "root",
     {
         dialect: 'postgres',
         host: process.env.DB_HOST,
         port: process.env.DB_PORT,
     }
     
)