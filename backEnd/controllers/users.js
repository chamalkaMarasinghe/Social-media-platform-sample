const User = require('../moedls/user')
const Chatroom = require('../moedls/chatroom')

const getUser = async (req, res) => {
    try {
        //destructuring id from the route parameters
        const { id } = req.params

        //find from the database
        const user = await User.findById(id)

        res.status(200).json(user)
    } 
    catch (error) {
        res.status(404).json({ 'msg' : error.message })    
    }
}

const getUserFriends = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        //friends array in userobject consists of friends _ids. Now we convert user id into an userObject for ecah user _id
        const friends = await Promise.all(user.friends.map((id) => User.findById(id)))

        //formting the friends array with only necessary fields
        const formattedFriends = friends.map(({_id,firstname,lastname,occupation,location,picturepath}) => {
            return {_id,firstname,lastname,occupation,location,picturepath}
        })

        res.status(200).json(formattedFriends)
    } 
    catch (error) {
        res.status(404).json({ 'msg' : error.message }) 
    }
}

const addRemoveFriends = async (req, res) => {
    try {
        //destructuring and findingboth user id and the friend id (friend - whose need to be added or removed)
        const { id , friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        //if the friend is not in the friend list of the user - so we need to add him to the friend list
        if(!user.friends.includes(friendId)){
            //we need to add friend to the user friend list and.. add user to the friend's friend list
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        //if the friend is already in the friend list of the user - so we need to remove him from the friend list
        else{
            user.friends = user.friends.filter((idNum) => idNum !== friendId)
            friend.friends = friend.friends.filter((idNum) => idNum !== id)
        }

        //changes of the relavant documentations saves in the DB
        user.save()
        friend.save()

        //friends array in userobject consists of friends _ids. Now we convert user id into an userObject for ecah user _id
        const friends = await Promise.all(user.friends.map((id) => User.findById(id)))

        //formting the friends array with only necessary fields
        const formattedFriends = friends.map(({_id,firstname,lastname,occupation,location,picturepath}) => {
            return {_id,firstname,lastname,occupation,location,picturepath}
        })

        res.status(200).json(formattedFriends)
    } 
    catch (error) {
        res.status(404).json({ 'msg' : error.message })
    }
}

const addToChat = async(req, res) => {
    try {
        const { id , friendId} = req.params
        const friend = await User.findById(friendId)
        const test1 = await Chatroom.findOne({ client1 : id, client2 : friendId})
        const test2 = await Chatroom.findOne({ client1 : friendId, client2 : id})

        if(test1 || test2){
            res.status(200).json({ msg : `${friend.firstname} already in the chat!!` })
        }
        else{
            await Chatroom.create({ client1 : id, client2 : friendId})
            res.status(200).json({ msg : `${friend.firstname} added to the chat!!` })
        }
    }
    catch(error) {
        res.status(404).json({ 'msg' : error.message })
    }
}

const getChatRooms = async(req, res) => {
    try {
        const { id } = req.params
        const result1 = await Chatroom.find({ client1 : id})
        const result2 = await Chatroom.find({ client2 : id})
        var concatanatedResult = result1.concat(result2)

        //{room._id, User.findById(room.client1), User.findById(room.client2), room.chats}
        // var formattedConcatanatedResult = await Promise.all(concatanatedResult.map((room) => {}))

        res.status(200).json({ msg : concatanatedResult})
    } 
    catch (error) {
        res.status(404).json({ 'msg' : error.message })
    }
}

module.exports = { getUser, getUserFriends, addRemoveFriends, addToChat, getChatRooms }