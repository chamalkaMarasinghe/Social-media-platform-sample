import React, { useState } from 'react'
import './UploadPost.css'
import ProfilePic from './avatar1.jpg'

function UploadPost(props) {

    const [ postDescription, setPostDescription ] = useState('')

    const uploadPostNow = async() => {

        await fetch('http://localhost:3001/posts', {
            method : "POST",
            body : JSON.stringify({ userID : props.userID, description : postDescription, picturePath : 'postpicpath'}),
            headers: { "Content-type": "application/json; charset=UTF-8"},
        })

        setPostDescription('')
        document.getElementById('uploadPost-row-1-innerColumn-2-inputField').value = ''
    }

    return (
        <div id='uploadPostWraper'>
            <div id='uploadPost-row-1'>
                <div id='uploadPost-row-1-innerColumn-1'>
                    <img id='uploadPost-row-1-innerColumn-1-profileImagae' src={ProfilePic} alt='Profile Picture'/>
                </div>
                <div id='uploadPost-row-1-innerColumn-2'>
                    <input id='uploadPost-row-1-innerColumn-2-inputField' type='text' placeholder='post' onChange={(e) => {setPostDescription(e.target.value)}}/>
                </div>
            </div>
            <div id='uploadPost-row-2'>
                <input type='file' />
                <button id='uploadPost-row-2-uploadButton' onClick={uploadPostNow}>Post</button>
            </div>
        </div>
    )
}

export default UploadPost