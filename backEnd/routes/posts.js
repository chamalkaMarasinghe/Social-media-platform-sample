const express = require("express")
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')
const { createPost, getAllPosts, getUserPosts, likePost, getUserPostsSearchable } = require('../controllers/posts')

//verify token should be added
router.post('/', createPost)
router.get('/', getAllPosts)
router.get('/:userID', getUserPosts)
router.post('/like/:postID', likePost)
router.get('/searchPost/:searchString', getUserPostsSearchable)

module.exports = router