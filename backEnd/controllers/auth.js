const bcrypt = require('bcrypt') //for encrypt passwords
const jwt = require('jsonwebtoken') //for user request authentication
const User = require('../moedls/user')

//Register user
const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, picturepath, friends, location, occupation } = req.body
        //console.log(req.body);

        //encrypting the paswword
        const salt = await bcrypt.genSalt()
        const hashedPW = await bcrypt.hash(password, salt)

        //generating random numeric values
        const viewedProfile = Math.floor(Math.random() * 10000)
        const impressions = Math.floor(Math.random() * 10000)

        const newUser = await User.create({firstname, lastname, email, password : hashedPW, picturepath, friends, location, occupation, viewedProfile, impressions})

        res.status(201).json(newUser)

    } catch (error) {
        res.status(500).json({'err' : error})
    }
}

//login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        //find data from the DB where the email was matched
        const userInDB = await User.findOne({ email : email})

        if(!userInDB){
            return res.status(404).json({ 'msg' : 'user does not exist' })
        }

        //compare the password
        const isMatch = await bcrypt.compare(password, userInDB.password)

        if(!isMatch){
            return res.status(404).json({ 'msg' : 'your Password is wrong'})
        }

        //create token for the user
        const token = jwt.sign({ id : userInDB.id }, process.env.JWT_SECRETSTRING)
        delete password

        //send tokento the user
        res.status(200).json({ token, userInDB })
    }
    catch (error) {
        res.status(404).json({ 'errMsg' : error.message })    
    }
}

module.exports = { register, login }
























