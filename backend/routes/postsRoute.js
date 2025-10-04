const router = require('express').Router();
const { createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require('../controllers/postsControllers');
const photoUpload = require('../middlewares/photoUpload');
const validateObjectId = require('../middlewares/validateObjectId');
const { verifyToken } = require('../middlewares/verifyToken');


// /api/posts
router.route('/')
.post(verifyToken, photoUpload.single("image"),createPostCtrl)
.get(getAllPostsCtrl)

router.route('/count').get( getPostCountCtrl)
router.route('/:id').get(validateObjectId, getSinglePostCtrl)
.delete(validateObjectId,verifyToken,deletePostCtrl)
.put(validateObjectId,verifyToken, updatePostCtrl)

router.put("/update-image/:id", validateObjectId, verifyToken, photoUpload.single("image"), updatePostImageCtrl)

router.put("/like/:id", validateObjectId, verifyToken, toggleLikeCtrl)

module.exports = router