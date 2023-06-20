const mongoose =  require('mongoose')

const ChatroomSchema = mongoose.Schema({
    client1 : {
        type : String,
        require : true,
    },

    client2 : {
        type : String,
        require : true,
    },

    chats : {
        type : Array,
        default : [],
    },

})

module.exports = mongoose.model("Chatroom", ChatroomSchema)