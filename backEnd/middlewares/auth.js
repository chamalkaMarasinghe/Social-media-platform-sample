const jwt = require('jsonwebtoken')

//verify token should be added to each as a middleware function like this --- router.get('/:id', verifyToken, getUser)
//Important thing is that the userToken must be embedded to each and every request that come from the front end
/*
an example

fetch('http:/localhost:3001/user', {
    method : 'get',
    headers : { 'Authorization' : `barear ${userToken}, 'content-type' : 'application.json'` }
})

*/

//middleware function for verify user web token 
const verifyToken = async (req, res, next) => {
    try {
        //get token from the request header - authorization is a header name which was cusomed by us
        //little cofusion about authorization..are we customized the token as authorization in each request???
        let token = req.header('Authorization')

        if(!token){
            return res.status(403).json({ 'msg' : 'access denied!' })
        }

        //checking whether the token is starts with specified name..in the front end we send token with this specified name
        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft()
        }

        //compare and verify the token with our secret string in .env file
        const verified = jwt.verify(token, process.env.JWT_SECRETSTRING)
        req.user = verified
        
        next()
    }
    catch (error) {
        res.status(500).json({ 'msg' : error.message})
    }
}

module.exports = { verifyToken }