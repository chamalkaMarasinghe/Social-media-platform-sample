const Post = require('../moedls/post')
const User = require('../moedls/user')

const createPost = async (req, res) => {
    try {
        //grab info fro the request
        const { userID, description, picturePath } = req.body
        const user = await User.findById(userID)

        //create a new post on the db
        const NewPost = await Post.create({
            userID,
            firstName : user.firstname,
            lastName : user.lastname,
            location : user.location,
            description,
            userPicturePath : user.picturepath,
            picturePath,
            likes : {},
            comments : []
        })

        //return the newly created post
        res.status(201).json(NewPost)
    } 
    catch (error) {
        res.status(409).json({msg : error.message})    
    }
}

const getAllPosts = async (req, res) => {
    try {
        //get allposts from the database and return them
        const allPosts = await Post.find({})
        res.status(200).send(allPosts)
    } 
    catch (error) {
        res.status(409).json({msg : error.message})       
    }
}

const getUserPosts = async (req, res) => {
    try {
        //getall posts those are posted by a specific user
        const { userID } = req.params
        const userPosts = await Post.find({userID : userID})
        res.status(200).send(userPosts)
    } 
    catch (error) {
        res.status(409).json({msg : error.message})       
    }
}

// live search bar......................

const getUserPostsSearchable = async (req, res) => {
    try {
        const searchString = req.params.searchString
        if(searchString !== '!!'){
            //regular expressions - checks whether the searchString exists in description field
            const result = await Post.find({description : {$regex : searchString}});
            res.status(200).send(result)
        }
        else{
            console.log('dhuttto');
            const result = await Post.find({});
            res.status(200).send(result)
        }
    } 
    catch (error) {
        res.status(409).json({msg : error.message})       
    }
}

//........................

const likePost = async (req, res) => {
    try {
        //grab information from the request
        const { postID } = req.params
        const { userID } = req.body
        
        //find the specified post 
        const post = await Post.findOne({ _id : postID}) 
        

        //if provided userID exists on 'likes' map of the post..which means that user already have liked to that post..so we need to unlike - remove userId from the 'likes' map
        if(post.likes.get(userID)){
            post.likes.delete(userID)
        }
        else{
            post.likes.set(userID, true)
        }

        //save the updated document to the database
        await post.save()

        //then get all post again and return
        const allPosts = await Post.find({})
        res.status(200).send(allPosts)

    } catch (error) {
        res.status(409).json({msg : error.message})           
    }
}

module.exports = { createPost, getAllPosts, getUserPosts, likePost, getUserPostsSearchable }

//when we deal with database operations, always we have gone with async approach. Therefore await keyword is necessary for database operation statements


