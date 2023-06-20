const express =  require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') //mongo db library
const cors = require('cors') //Cors will let us accept cross origin request from our frontend to backend.
const dotenv = require('dotenv') //for keep secret and non shareable properies
const multer = require('multer') //Multer is a middleware that will let us handle multipart/form data sent from our frontend form.
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const { fileURLToPath } = require('url')
const { register } = require('./controllers/auth.js')
const { createPost } = require('./controllers/posts.js')
const { verifyToken } = require('./middlewares/auth')

/*
followings are need to in order to reading FormData objects
var forms = multer();
app.use(forms.array());
app.use(cors()) 
*/
var forms = multer();

//configuration
// const __filenamez = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filenamez)
dotenv.config()
const app = express()
app.use(express.json({extended : true}))
app.use(express.urlencoded({extended : true}))
app.use(forms.array()); 
app.use(bodyParser.json({limit : '30mb', extended : true}))
app.use(bodyParser.urlencoded({limit : '30mb', extended : true}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan("common"))
app.use(cors())
app.use(express.static('/public/assets'))

//file storage
// const storage = multer.diskStorage({
//     destination : function (req, file, cb){
//         cb(null, '/public/assets')
//     },
//     filename : function (req, file, cb){
//         cb(null, file.originalname)
//     },
// })
// const storage = multer.diskStorage({
//     destination : (req, file, cb) => {
//         cb(null, './images')
//     },
//     filename : (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     },
// })
// const upload = multer({ storage : storage})


//routes with files
const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/users.js')
const postRoute = require('./routes/posts.js')
app.use('/auth', authRoute)
app.use('/users', userRoute) 
app.use('/posts', postRoute)

//this routes shoud be in app.js because file upload method accomodates in this file
//an image will be uloaded when register an user
//upload.single('picturepath')
// const mid = (req, res, next) => {
//     console.log(req.body)
// }
app.post('/auth/register', register)
//an image will be uploaded when upload a post..verifytoken should be added
app.post('/posts,', createPost)

const Chatroom = require('./moedls/chatroom')

//get all the chats of a specified room
app.get('/:roomid', async(req, res) => {
    try {
        const { roomid } = req.params
        const result = await Chatroom.findById(roomid)
        res.status(200).json({ 'array' : result.chats})
    } 
    catch (error) {
        res.status(404).json({ 'msg' : error.message })
    }
})

// socket configuration for chatting -----------------------------------------------------------------------

const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)

const io = new Server( server, {
    cors : {
        origin : 'http://localhost:3000',
        methods : ["GET", "POST"],
    },
})

//io listning to the events...socket coming from the client's end
io.on("connection", (socket) => {
    console.log(`user conected on socket ${socket.id}`)

    //socket waiting for occuer join_room event that emit from the client's end
    socket.on('join_room', (roomId) => {
        socket.join(roomId)
        console.log(`user with id ${socket.id} joind to room with id ${roomId}`);
    })

    //socket waiting for a client send a message
    socket.on("send_message", async(messageContainer) => {
        //trigger the receive message event in the client end..and send the message to the relavant room
        const currentRoom = await Chatroom.findById(messageContainer.room)
        currentRoom.chats.push(messageContainer.msg)
        currentRoom.save()
        socket.to(messageContainer.room).emit('receive_message', messageContainer)
    })

    //when disconnected from the socket
    socket.on("disconnect", () => {
        console.log(`user disconnected from socket ${socket.id}`);
    })
})

// ...................................


//mongo setup
const PORT = process.env.PORT
mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(PORT, () => {console.log(`server running on port ${PORT}`);})
    })
    .catch((err) => {console.log(err);})

















