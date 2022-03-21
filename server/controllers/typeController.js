const { Type } = require("../models/models"); //импортируем модель типа для добавления обьекта в бд
const ApiError = require("../error/ApiError");
class TypeController {
  async create(req, res) {
      const {name} = req.body
      const type = await Type.create({name})
      return res.json(type)//передаем в обьект только название типа
  }

  async getAll(req, res) {
    const types = await Type.findAll()
    return res.json(types)
  }
}

module.exports = new TypeController();
