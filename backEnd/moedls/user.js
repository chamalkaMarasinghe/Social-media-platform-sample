const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        min : 2,
        max : 50,
    },

    lastname : {
        type : String,
        required : true,
        min : 2,
        max : 50,
    },

    email : {
        type : String,
        required : true,
        max : 50,
        unique : true,
    },

    password : {
        type : String,
        required : true,
        min : 5,
    },

    picturepath : {
        type : String,
        default : "",
    },

    friends : {
        type : Array,
        default : [],
    },

    location : String,
    occupation : String,
    viewedProfile : Number,
    impressions : Number,
})

module.exports = mongoose.model('User', UserSchema)