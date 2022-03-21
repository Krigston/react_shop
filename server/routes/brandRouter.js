const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')//импортируем контроллер

router.post('/', brandController.create)//создаем бренд
router.get('/',brandController.getAll)//получаем бренд

module.exports = router