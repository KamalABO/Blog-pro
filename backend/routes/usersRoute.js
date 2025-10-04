const router = require('express').Router();
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl, deleteUserProfileCtrl } = require('../controllers/usersController');
const photoUpload = require('../middlewares/photoUpload');
const validateObjectId = require('../middlewares/validateObjectId');
const { verifyTokenAdmin, verifyToken, verifyTokenOnlyUser, verifyTokenAndAuthorization } = require('../middlewares/verifyToken');


router.get('/profile', verifyTokenAdmin, getAllUsersCtrl)
router.get('/profile/:id',validateObjectId, getUserProfileCtrl)
router.put('/profile/:id',validateObjectId, verifyTokenOnlyUser, updateUserProfileCtrl)
// /api/users/count
router.route("/count").get(verifyTokenAdmin, getUsersCountCtrl);
router.post('/profile/profile-photo-upload', verifyToken,photoUpload.single("image"), profilePhotoUploadCtrl)
router.delete('/profile/:id',validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl)

module.exports = router
