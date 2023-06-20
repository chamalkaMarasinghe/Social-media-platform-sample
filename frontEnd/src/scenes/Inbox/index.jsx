import { React, useState, useEffect } from 'react'
import './index.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')


function Inbox() {
    const user = useSelector((state) => state.user)
    const params = useParams()
    const [rooms, setRooms] = useState([])
    const [currentRoomId, setCurrentRoomId] = useState('')
    const [currentMsg, setCurrentMsg] = useState('')
    const [msgList, setMsgList] = useState([])

    //get all the chat rooms where the user has associated with
    const getChatRoomsHelper = async() => {

        const dbAccess = await fetch(`http://localhost:3001/users/getrooms/${params.userID}`, {
            method : "GET",
            headers : { "content-type" : "application/json" },
        })
        const response = dbAccess.json()
        return response
    }

    //get user name and room id  and join the specified user to that room
    const joinRoom = (roomId) => {
        if(roomId !== ""){

            //emit the user defined event name join room..the back end should be listned to this event
            socket.emit('join_room', roomId)
        }
    }

    //grab the user message and send to the relavat room
    const sendMessages = async() => {
        const messageContainer = {
            room : currentRoomId,
            msg : currentMsg,
            time : new Date(Date.now()).getHours() + " : " + new Date(Date.now()).getMinutes(),
        }

        setMsgList((list) => [...list, messageContainer.msg])
        //setMsgList([...msgList, messageContainer.msg])
        setCurrentMsg("")
        await socket.emit('send_message', messageContainer)
    }

    //listning for a message recieve...re render when socket get changed
    useEffect(() => {
        socket.on('receive_message', (messageContainer) => {
            setMsgList((list) => [...list, messageContainer.msg])
        })
    }, [socket])

    //loading all the messages upto now in the database of current room
    const loadMsg = async(roomid) => {
        const request = await fetch(`http://localhost:3001/${roomid}`, {
            method : "GET",
        })
        const response = request.json()
        return response
    }

    //get all the rooms
    useEffect(() => {
        getChatRoomsHelper().then((res) => {setRooms(res.msg)})
    }, [params.userID])

    //get all the messages
    useEffect(() => {
        loadMsg(currentRoomId).then((res) => {setMsgList(res.array)})
    }, [currentRoomId])

    //get all the messages in the db and copied to a separate array..since that point, all uploading and recieing messages are reflected to that separe array.
    //but also in the send messge function, messages are uploaded to the relavent room in the database

    return (
        <>
            <div id='zx'>
                my chats
                {
                    rooms.map((obj, index) => 
                            <div key={index} id='erf' onClick={() => {setCurrentRoomId(obj._id); joinRoom(obj._id)}}>
                                <h2>room id : {obj._id}  +  myFriend : {user._id === obj.client1 ? obj.client2 : obj.client1}</h2>
                            </div>
                    )
                }
            </div>
            <div id='chatbox'>
                {
                    msgList.map((obj, index) => <p key={index} className='inboxMsg'>{obj}</p>)
                }
                <input type='text' placeholder='type....' value={currentMsg} onChange={(e) => {setCurrentMsg(e.target.value)}}></input>
                <button onClick={() => {sendMessages()}}>Send Message</button>
            </div>
        </>
    )
}

export default Inbox