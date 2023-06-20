const express = require('express')
const router = express.Router()
const { getUser, getUserFriends, addRemoveFriends, addToChat, getChatRooms } = require('../controllers/users')
const { verifyToken } = require('../middlewares/auth')

//verify token should be added to each as a middleware function like this --- router.get('/:id', verifyToken, getUser)
//Important thing is that the userToken must be embedded to each and every request that come from the front end
/*
an example

fetch('http:/localhost:3001/user', {
    method : 'get',
    headers : { 'Authorization' : `barear ${userToken}, 'content-type' : 'application.json'` }
})

*/

router.get('/:id', getUser)
router.get('/friends/:id', getUserFriends)
router.post('/:id/addfriend/:friendId', addRemoveFriends)
router.post('/:id/addToChat/:friendId', addToChat)
router.get('/getrooms/:id', getChatRooms)
//more routes

module.exports = router