const { Brand } = require("../models/models"); //импортируем модель бренда для добавления обьекта в бд
const ApiError = require("../error/ApiError");
class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand); //передаем в обьект только название бренда
  }

  async getAll(req, res) {
      const brands = await Brand.findAll()
      return res.json(brands)
  }
}

module.exports = new BrandController();
