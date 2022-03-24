const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt"); //импортируем для шифрования паролей пользователей
const jwt = require("jsonwebtoken"); //импортируем jsonwebtoken, для jwt токена
const { User, Basket } = require("../models/models"); //импортируем модель пользователя
//создаем токен для логина
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, "random_secret_key123", {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    //создаем условие для того что бы под одним email не было зарегистрированно несколько пользователей
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    //хешируем пароль, число указывает на количество раз хеширования
    const hashPassword = await bcrypt.hash(password, 5);
    //создаем пользователя
    const user = await User.create({ email, role, password: hashPassword });
    //создаем корзину для пользователя
    const basket = await Basket.create({ userId: user.id });
    //создаем jwt токен
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  //реализуем логин
  async login(req, res, next) {
    const { email, password } = req.body;
    //проверяем есть ли унас такой пользователь
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    //проверяем пароль
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    //генирируем и возвращаем токен
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
