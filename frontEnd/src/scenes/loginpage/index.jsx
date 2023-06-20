import React from "react"
import axios from 'axios'
import { useState } from "react"
import CustomInputField from "../../components/CustomInputField"
import { DummyNavbar } from "../navbar"
import './index.css'
import { useDispatch } from "react-redux"
import { setLogin, setFriends, setPosts } from '../../state'
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    //to select between register form an login form..this flag can be used
    const [ isNeedToRegister, setIsNeedToRegister ] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //state for form values
    const [ firstname, setFirstname ] = useState('')
    const [ lastname, setLastname ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ occupation, setOccupation ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ image, setImage ] = useState({ preview : '', data : '' })
    
    //the function to be executed when the form is submitted
    const submitForm = async (e) => {

        e.preventDefault()

        if(isNeedToRegister){
            //if submit is registration form
            const formData = new FormData()
            formData.append('firstname', firstname)
            formData.append('lastname', lastname)
            formData.append('location', location)
            formData.append('occupation', occupation)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('picturepath', image.preview)
            //formData.append('uploadedImg', image.data)

            await axios({
                method: "post",
                url: "http://localhost:3001/auth/register",
                data: formData,
                //for sending FormData object-relavent headers
                headers: { 'Content-Type': 'multipart/form-data',},
            })
            .then((response) => {console.log(response);})
            .catch((err)=>{console.log(err.message)})
        }
        else{
            //if submit is login form
            //fetch is a inbuilt techniques in react for send http requests
            const logginResponse = await fetch("http://localhost:3001/auth/login", {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({ email, password }),
            })

            const loggedUser = await logginResponse.json()

            if(loggedUser.userInDB){
                //if a result received from the backend
                dispatch(setLogin({ 
                    user : loggedUser.userInDB,
                    token : loggedUser.token,
                }))

                // at the moment the user has logged in to the system, get all his friends and save in to the global state
                //by keeping friends in the global state..it is easy to render friends add/removal changes 
                const helperFunction = async() => {
                    const getFriendList = await fetch(`http://localhost:3001/users/friends/${loggedUser.userInDB._id}`, {
                        method : 'GET',
                        headers : { "Content-Type" : "application/json" },
                    })
                    const recievedList = await getFriendList.json()
                    return recievedList
                }

                // at the moment the user has logged in to the system, get all posts and saved in the global state. by the way easy to build live search bar..whn user enter keyword in the search bar..those results also get saved in the global state
                //..then navigate to home page
                const getAllPostsMethod = async() => {
                    const getAllPosts = await fetch(`http://localhost:3001/posts`, {
                        method : 'GET',
                        headers : { "Content-Type" : "application/json" },
                    })
                    const allReceivedPosts = getAllPosts.json()
                    return allReceivedPosts
                }
                
                helperFunction().then((res) => {dispatch(setFriends({ friends : res,}))})
                getAllPostsMethod().then((res) => {dispatch(setPosts({ posts : res,})); navigate('/home')})
                //navigate('/home')
            }
            else{
                //if an error msg recived from the backend
                document.getElementById('welcomeMsg').innerHTML = loggedUser.msg
            }
        }
    }

    //function for sync image to state
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        //console.log(`my img : ${img.data}`);
        setImage(img)
    }

    return(
        <div>
            <DummyNavbar />
            <div id="loginWidget">
                <h4 id='welcomeMsg'>Welcome to Sociopedia..Best platform for Psycopaths</h4>
                <form onSubmit={submitForm}>
                    { isNeedToRegister && 
                        <React.Fragment>                  
                            <CustomInputField type='text' name='firstname' placeholder='First Name' onchangeMethod={(e) => setFirstname(e.target.value)}/>
                            <CustomInputField type='text' name='lasttname' placeholder='Last Name' onchangeMethod={(e) => setLastname(e.target.value)}/>
                            <CustomInputField type='text' name='location' placeholder='Location' onchangeMethod={(e) => setLocation(e.target.value)}/>
                            <CustomInputField type='text' name='occupation' placeholder='Occupation' onchangeMethod={(e) => setOccupation(e.target.value)}/>
                            <input type='file' name='profilePicture' onChange={handleFileChange}/>
                        </React.Fragment>
                    }
                    <CustomInputField type='text' name='email' placeholder='E-mail' onchangeMethod={(e) => setEmail(e.target.value)}/>
                    <CustomInputField type='text' name='password' placeholder='Password' onchangeMethod={(e) => setPassword(e.target.value)}/>
                    <input id="submitLogin" type='submit' name='submit' value={isNeedToRegister ? 'Register' : 'Login'} />
                </form>
                <br />
                {isNeedToRegister ? 
                    <a href='#' onClick={() => setIsNeedToRegister(false)}>Already have an Account ? login here!</a> :
                    <a href='#' onClick={() => setIsNeedToRegister(true)}>Don't have an Account ? Signup here!</a>
                }
            </div>
            <br />
        </div>
    )
}

export default LoginPage