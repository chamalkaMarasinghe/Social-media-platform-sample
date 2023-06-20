import { createSlice } from '@reduxjs/toolkit'

//all global states accomodates in here and these are accesible throug any component in the heirarchy

const initialState = {
    mode : 'light', // not used yet
    user : null,
    //user : {'firstname' : 'chamal', 'lastname' : 'mare'},
    token : null,
    posts : [], // not used yet
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setMode : (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },

        setLogin : (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },

        setLogout : (state) => {
            state.user = null
            state.token = null
        },

        setFriends : (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends
            }
            else{
                console.error('user friends non existent!!')
            }
        },

        setPosts : (state, action) => {
            state.posts = action.payload.posts
        },

        setPost : (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.postID) return action.payload.post
                return post
            })
            state.posts = updatedPosts
        },
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions
export default authSlice.reducer