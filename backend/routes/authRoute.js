const { registerUserCtrl, loginUserCtrl, verifyUserAccountCtrl } = require('../controllers/authController')

const router = require('express').Router()


// /api/auth/login
router.post('/register',registerUserCtrl)
router.post('/login',loginUserCtrl)
// /api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccountCtrl);



module.exports = router