require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const fileUpload = require('express-fileupload');
const router = require('./routes/index.js')//импортируем роутер
const errorHandler = require('./middleware/ErrorHandingMiddleware')//импортируем middleware
const path = require('path')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));//регистрируем fileUpload
app.use('/api', router)
app.use(errorHandler)//последний middleware всегда регистрируется в конце 


const start = async () => {
  try {
    await sequelize.authenticate(); //подключаемся к бд
    await sequelize.sync(); //сверяем состояние бд и схемы бд
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
