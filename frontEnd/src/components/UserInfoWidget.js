import './UserInfoWidget.css'
import React, { useEffect } from 'react'
import ProfilePic from './avatar1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

function UserInfoWidget (props){
    const loggedInUser = useSelector((state) => state.user)

    //in such asituations ...async part should be formed as a separated function and it should be invoked within useeffect( componentDidMount) ..and always should be used state/useState..not regular variables
    const [ user, setUser ] = useState({})
    const [ nmbrOfFriends, setNmbrOfFriends] = useState(0)

    const helperFunction = async () => {
        const getUserFromDB = await fetch(`http://localhost:3001/users/${props.userID}`, {
            method : 'GET',
            headers : { "Content-Type" : "application/json" },
        })
        const user = await getUserFromDB.json()
        return user
    }

    useEffect(() => {
        //in most cases the response only displays properly in the then promise()..not properly displays in helperFunction()
        helperFunction().then((res) => {setUser(res); setNmbrOfFriends(res.friends.length)})
    }, [props.userID])
    //useEffect hook is customized as to execute after th component is rendered..but if the props.userID get changed..our userinfowidget must be re rendered..therefore userinfo widget should only re rendered if the props.userID(the argument which userinfo widget receives) has changed

    return (
        <div id='UserInfoWidgetWrapper'>
            <div id='UserInfoWidget-row1'>
                <div id='UserInfoWidget-row1-innerColumn-1'>
                    <img id='UserInfoWidget-row1-innerColumn-1-profileIMge' src={ProfilePic} alt='oroile Picture'/>
                </div>
                <div id='UserInfoWidget-row1-innerColumn-2'>
                    <h4 id='UserInfoWidget-row1-innerColumn-2-username'>{user.firstname} {user.lastname}</h4>
                    <h6 id='UserInfoWidget-row1-innerColumn-2-nmbrOfFriends'>{nmbrOfFriends}</h6>
                </div>
                <div id='UserInfoWidget-row1-innerColumn-3'>
                    {
                        //add friend icon not visible in our own user info widget
                        loggedInUser._id !== user._id && <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32S80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4c24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48c0-61.9-50.1-112-112-112z"/></svg>
                    }
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32S80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4c24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48c0-61.9-50.1-112-112-112z"/></svg> */}
                </div>
            </div>
            <div id='UserInfoWidget-row2'>
                <div id='UserInfoWidget-row2-innerColumn-1'>
                    {/* icon location */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12Zm0 9.625q-.2 0-.4-.075t-.35-.2Q7.6 18.125 5.8 15.363Q4 12.6 4 10.2q0-3.75 2.413-5.975Q8.825 2 12 2t5.587 2.225Q20 6.45 20 10.2q0 2.4-1.8 5.163q-1.8 2.762-5.45 5.987q-.15.125-.35.2q-.2.075-.4.075Z"/></svg>
                    {/* {icon occupation} */}
                    <br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2L10.85 19v2H4a2 2 0 0 1-2-2V8c0-1.11.89-2 2-2h4V4c0-1.11.89-2 2-2h4m0 4V4h-4v2h4m7.04 6.13c-.14 0-.28.06-.39.17l-1 1l2.05 2.05l1-1c.22-.21.22-.56 0-.77l-1.28-1.28a.533.533 0 0 0-.38-.17m-1.97 1.75L13 19.94V22h2.06l6.06-6.07l-2.05-2.05Z"/></svg>
                </div>
                <div id='UserInfoWidget-row2-innerColumn-2'>
                    <h6 id='UserInfoWidget-row2-innerColumn-2-location'>{user.location}</h6>
                    <h6 id='UserInfoWidget-row2-innerColumn-2-occupation'>{user.occupation}</h6>
                </div>
            </div>
            <div id='UserInfoWidget-row3'>
                <div id='UserInfoWidget-row3-innerRow-1'>
                    <h6 id='UserInfoWidget-row3-innerRow-1-title'>Who's viewed your profile </h6>
                    <h6 id='UserInfoWidget-row3-innerRow-1-value'>{user.viewedProfile}</h6>
                </div>
                <div id='UserInfoWidget-row3-innerRow-2'>
                    <h6 id='UserInfoWidget-row3-innerRow-2-title'>Who's viewed your profile </h6>
                    <h6 id='UserInfoWidget-row3-innerRow-2-value'>{user.impressions}</h6>
                </div>
            </div>
            <div id='UserInfoWidget-row4'>
                <div id='UserInfoWidget-row4-SocialMediaName'><h5>Social Profiles</h5></div>
                <div id='UserInfoWidget-row4-innerRow-1'>
                    <div id='UserInfoWidget-row4-innerRow-1-Column1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"/></svg>
                    </div>
                    <div id='UserInfoWidget-row4-innerRow-1-Column2'>
                        <h6 id='UserInfoWidget-row4-innerRow-Column2-socialMediaName'>Twitter</h6>
                        <h6 id='UserInfoWidget-row4-innerRow-Column2-socialMediaDesc'>Network Platform</h6>
                    </div>
                    <div id='UserInfoWidget-row4-innerRow-1-Column3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m6.95 14.93l4.24-5.66l8.49-7.07c.39-.39 1.04-.39 1.41 0l.71.71c.39.37.39 1.02 0 1.41l-7.07 8.49l-5.66 4.24l-2.12-2.12m1.41 2.83l-2.12-2.12l-2.83 1.41L2 21.29l2.12-2.12c.2-.17.51-.17.71 0c.17.2.17.51 0 .71L2.71 22l4.24-1.41l1.41-2.83Z"/></svg>
                    </div>
                </div>
                <div id='UserInfoWidget-row4-innerRow-2'>
                    <div id='UserInfoWidget-row4-innerRow-2-Column1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
                    </div>
                    <div id='UserInfoWidget-row4-innerRow-2-Column2'>
                        <h6 id='UserInfoWidget-row4-innerRow-Column2-socialMediaName'>Twitter</h6>
                        <h6 id='UserInfoWidget-row4-innerRow-Column2-socialMediaDesc'>Network Platform</h6>
                    </div>
                    <div id='UserInfoWidget-row4-innerRow-2-Column3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m6.95 14.93l4.24-5.66l8.49-7.07c.39-.39 1.04-.39 1.41 0l.71.71c.39.37.39 1.02 0 1.41l-7.07 8.49l-5.66 4.24l-2.12-2.12m1.41 2.83l-2.12-2.12l-2.83 1.41L2 21.29l2.12-2.12c.2-.17.51-.17.71 0c.17.2.17.51 0 .71L2.71 22l4.24-1.41l1.41-2.83Z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoWidget