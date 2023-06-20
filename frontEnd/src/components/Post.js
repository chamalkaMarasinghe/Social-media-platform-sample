import React from 'react'
import './Post.css'
import ProfilePic from './avatar1.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setFriends } from '../state'

function Post(props) {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    //two methods for add/remove friends
    const changeFriendsUpdateDB = async(userid, friendid) => {
        const updatesFriends = await fetch(`http://localhost:3001/users/${userid}/addfriend/${friendid}`, {
            method : 'POST',
            body : JSON.stringify({ id : userid, friendId : friendid}),
            headers : {"Content-Type" : "application/json"},
        })

        const updatedList = updatesFriends.json()
        return updatedList
    }

    const changeFriends = (userid, friendid) => {
        changeFriendsUpdateDB(userid, friendid).then((res) => {dispatch(setFriends({ friends : res, }))})
    }

    const myFuncHelper = async(userid, friendid) => {
        const accessDB = await fetch(`http://localhost:3001/users/${userid}/addToChat/${friendid}`, {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
        })

        const response = accessDB.json()
        return response
    }

    const myFunc = (userid, friendid) => {
        myFuncHelper(userid, friendid).then((res) => {
            alert(`${res.msg}`)
        })
    }

    return (
    <div id='postWrapper'>
        <div id='post-innerRow-1'>
            <div id='post-innerRow-1-Column-1'>
                <img id='post-innerRow-1-Column-1-ProfileImage' src={ProfilePic} alt='oroile Picture' onClick={() =>{navigate(`/profile/${props.post.userID}`)}}/>
            </div>
            <div id='post-innerRow-1-Column-2'>
                <h4 id='post-innerRow-1-Column-2-Username'>{props.post.firstName} {props.post.lastName}</h4>
                <h6 id='post-innerRow-1-Column-2-Location'>{props.post.location}</h6>
            </div>
            <div id='post-innerRow-1-Column-3'>
                {   //if we are currently in our own user profile page, the add friend icon on a post not visible
                    user._id !== props.post.userID && <svg onClick={() => {changeFriends(user._id, props.post.userID)}} xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32S80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4c24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48c0-61.9-50.1-112-112-112z"/></svg>

                }
                {/* <svg onClick={() => {changeFriends(user._id, props.post.userID)}} xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32S80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4c24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48c0-61.9-50.1-112-112-112z"/></svg> */}
            </div>
        </div>
        <div id='post-innerRow-2'>
            <h5>{props.post.description}</h5>
        </div>
        <div id='post-innerRow-3'>
            <img id='post-innerRow-3-postImage' src={ProfilePic} alt='post image'/>
        </div>
        <div id='post-innerRow-4'>
            <div id='post-innerRow-4-innerColumn-1'>
                <div id='post-innerRow-4-innerColumn-1-innerColumn-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 17v-3h-3v-2h3V9h2v3h3v2h-3v3Zm-7 4l-3.175-2.85q-1.8-1.625-3.087-2.9q-1.288-1.275-2.125-2.4q-.838-1.125-1.225-2.175Q1 9.625 1 8.475q0-2.35 1.575-3.913Q4.15 3 6.5 3q1.3 0 2.475.537Q10.15 4.075 11 5.075q.85-1 2.025-1.538Q14.2 3 15.5 3q2.125 0 3.562 1.287Q20.5 5.575 20.85 7.3q-.45-.175-.9-.263q-.45-.087-.875-.087q-2.525 0-4.3 1.762Q13 10.475 13 13q0 1.3.525 2.462q.525 1.163 1.475 1.988q-.475.425-1.238 1.088Q13 19.2 12.45 19.7Z"/></svg></div>
                <div id='post-innerRow-4-innerColumn-1-innerColumn-2'>
                    <h6>23</h6>
                </div>
            </div>
            <div id='post-innerRow-4-innerColumn-2'>
                <div id='post-innerRow-4-innerColumn-2-innerColumn-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M7 14h10q.425 0 .712-.288Q18 13.425 18 13t-.288-.713Q17.425 12 17 12H7q-.425 0-.713.287Q6 12.575 6 13t.287.712Q6.575 14 7 14Zm0-3h10q.425 0 .712-.288Q18 10.425 18 10t-.288-.713Q17.425 9 17 9H7q-.425 0-.713.287Q6 9.575 6 10t.287.712Q6.575 11 7 11Zm0-3h10q.425 0 .712-.287Q18 7.425 18 7t-.288-.713Q17.425 6 17 6H7q-.425 0-.713.287Q6 6.575 6 7t.287.713Q6.575 8 7 8Zm13.3 12.3L18 18H4q-.825 0-1.412-.587Q2 16.825 2 16V4q0-.825.588-1.413Q3.175 2 4 2h16q.825 0 1.413.587Q22 3.175 22 4v15.575q0 .675-.612.937q-.613.263-1.088-.212Z"/></svg></div>
                <div id='post-innerRow-4-innerColumn-2-innerColumn-2'>
                    {
                        user._id !== props.post.userID && <button onClick={() => {myFunc(user._id, props.post.userID)}}>add to chat</button>
                    }
                </div>
            </div>
            {/* <div id='post-innerRow-4-innerColumn-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92c1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
            </div> */}
        </div>
    </div>
    )
}

export default Post