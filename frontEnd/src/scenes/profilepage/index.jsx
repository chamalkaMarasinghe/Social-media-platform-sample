import UserInfoWidget from "../../components/UserInfoWidget"
import Post from '../../components/Post'
import ShowFriendsWidget from '../../components/ShowFriendsWidget'
import UploadPost from '../../components/UploadPost'
import { Navbar, DummyNavbar } from "../navbar"
import { useSelector, useDispatch } from "react-redux"
import './index.css'
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const ProfilePage = () => {
    // const user = useSelector((state) => state.myReducer.user)
    const user = useSelector((state) => state.user)
    const [ allUserPosts, setAllUserPosts] = useState([])
    const [ expandTab, setExpandTab ] = useState(true)

    //in node js, we can directly read route params of a URL. But in react we should use useParams hook
    const params = useParams()

    const getOnlyUserPostsMethod = async() => {
        const getOnlyUserPosts = await fetch(`http://localhost:3001/posts/${params.userID}`, {
            method : 'GET',
            headers : { "Content-Type" : "application/json" },
        })
        const onlyUserReceivedPosts = await getOnlyUserPosts.json()
        return onlyUserReceivedPosts
    }

    useEffect(() => {
        getOnlyUserPostsMethod().then((res) => {setAllUserPosts(res)})
    }, [params.userID])
    //useEffect hook is customized as to execute after th component is rendered..but if the props.userID get changed..our userinfowidget must be re rendered..therefore userinfo widget should only re rendered if the props.userID(the argument which userinfo widget receives) has changed


    const expand = () => {
        if(expandTab){
            document.getElementById('hiddenFriendList').style.marginLeft = '0px'
            setExpandTab(false)
        }
        else{
            document.getElementById('hiddenFriendList').style.marginLeft = '-8%'
            setExpandTab(true)
        }

    }

    return(
        <div>
            <Navbar />
            <div id="profilepageWrapper">
                <div id="hiddenFriendList" >
                    <ShowFriendsWidget userID={user._id}/>
                    <div id="hiddenFriendListExpandIcon">
                        {
                            expandTab ? <svg onClick={expand} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h9m-9 4h16m0 0l-3-3m3 3l-3 3M4 16h9"/></svg> :
                            <svg onClick={expand} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 8h-9m9 4H4m0 0l3-3m-3 3l3 3m13 1h-9"/></svg>
                            
                        }
                    </div>
                </div>
                <div id="profilepageWrapper-row1">
                    <UserInfoWidget userID={params.userID}/>
                    <ShowFriendsWidget userID={params.userID}/>
                </div>
                <div id="profilepageWrapper-row2">
                    {/* <UploadPost userID={user._id}/> */}
                    {
                        allUserPosts.map((item ,index) => <Post key={index} post={item}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage