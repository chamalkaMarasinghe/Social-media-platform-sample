import UserInfoWidget from "../../components/UserInfoWidget"
import Post from '../../components/Post'
import ShowFriendsWidget from '../../components/ShowFriendsWidget'
import UploadPost from '../../components/UploadPost'
import { Navbar } from "../navbar"
import { useSelector, useDispatch } from "react-redux"
import './index.css'
import { useState } from "react"
import { useEffect } from "react"

const HomePage = () => {

    //const user = useSelector((state) => state.myReducer.user)
    const user = useSelector((state) => state.user)
    // const [ allPosts, setAllPosts] = useState([])
    //all posts reading from the global state
    const allPosts = useSelector((state) => state.posts)

    return(
        <div>
            <Navbar />
            <div id="homepageWrapper">
                <div id="homepageWrapper-row1">
                    <UserInfoWidget userID={user._id}/>
                </div>
                <div id="homepageWrapper-row2">
                    <UploadPost userID={user._id}/>
                    {
                        allPosts.map((item ,index) => <Post key={index} post={item}/>)
                    }
                </div>
                <div id="homepageWrapper-row3">
                    <ShowFriendsWidget userID={user._id}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage