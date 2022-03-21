const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')//импортируем контроллер

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)//нужен для конкретного девайса

module.exports = router