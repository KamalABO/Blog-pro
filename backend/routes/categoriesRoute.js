const { createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl } = require('../controllers/categoriesController')
const validateObjectId = require('../middlewares/validateObjectId')
const { verifyTokenAdmin } = require('../middlewares/verifyToken')

const router = require('express').Router()

router.route('/')
.post(verifyTokenAdmin, createCategoryCtrl)
.get(getAllCategoriesCtrl)

router.route('/:id').delete(validateObjectId,verifyTokenAdmin, deleteCategoryCtrl)

module.exports = router