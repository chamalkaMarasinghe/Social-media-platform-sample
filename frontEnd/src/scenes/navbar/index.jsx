import { useState } from 'react' 
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, setPosts } from '../../state'
import { useNavigate } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {

    const navigate = useNavigate()
    //dispatcher hook is used to invoke reducer methods of global state
    const dispatch = useDispatch()
    //useSelector hook is used to grab global state
    // const user = useSelector((state) => state.myReducer.user)
    const user = useSelector((state) => state.user)
    const fullname = `${user.firstname} ${user.lastname}`

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
    }
    }
    
    const postLiveSearch = async (searchString) => {
        const q = await fetch(`http://localhost:3001/posts/searchPost/${searchString}`, {
            method : 'GET',
            headers : { 'Content-Type' : 'application/json'},
        })
        const r = await q.json()
        return r
    }

    const postLiveSearchMethod = (e) => {
        if(!e.target.value){
            var query = '!!'
        }
        else{
            var query = e.target.value
        }

        postLiveSearch(query).then((res) => {dispatch(setPosts({ posts : res,}))})
    }

    return(
        <React.Fragment>
            <div id='navbarWrapper'>
                <div id='sociopediaDiv'>
                    <h1 onClick={() => {navigate('/home')}}>Sociopedia</h1>
                </div>
                <div id='searchbarDiv'>
                    <input onChange={postLiveSearchMethod} placeholder='search...'/>
                </div>
                <div id='iconsDiv'>
                    <div>
                        <svg onClick={() => {navigate(`/inbox/${user._id}`)}}xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24    24"><path fill="currentColor" d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5   3.61 5 6.71v6l2 2m-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m9.75-17.81l-1.42 1.42A8.982 8.982 0 0 1 21 11h2c0-2.93-1.16-5.75-3.    25-7.81M1 11h2c0-2.4.96-4.7 2.67-6.39L4.25 3.19A10.96 10.96 0 0 0 1 11Z"/></svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11.95 18q.525 0 .888-.363q.362-.362.362-.887t-.362-.887q-.363-.363-.888-.363t-.888.363q-.362.362-.362.887t.362.887q.363.363.888.363Zm-.9-3.85h1.85q0-.825.188-1.3q.187-.475 1.062-1.3q.65-.65 1.025-1.238q.375-.587.375-1.412q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75q-.888.75-1.238 1.8l1.65.65q.125-.45.563-.975Q11.2 7.7 12.1 7.7q.8 0 1.2.437q.4.438.4.963q0 .5-.3.937q-.3.438-.75.813q-1.1.975-1.35 1.475q-.25.5-.25 1.825ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>
                    </div>
                </div>
                <div id='usernameDiv'>
                    <h3 onClick={() => {navigate(`/profile/${user._id}`)}}>{fullname}</h3>
                </div>
                <div id='logoutButtonDiv'> {/*dispatch(setLogout()) */}
                    <button id='logoutButton' onClick={() => {dispatch(setLogout())}}>
                        <svg id='logoutIcon' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="white" d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4l-5 4z"/></svg>
                    </button>
                </div>
                <div className="dropdown">
                    <button onClick={myFunction} className="dropbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 2048 2048"><path fill="white" d="M1152 1536h896l-448 448l-448-448zm0-128v-128H896v640H256v-805l-83 82l-90-90l941-942l941 942l-90 90l-83-82v293h-128V987l-640-640l-640 640v805h384v-640h512v256h-128z"/></svg>
                    </button>
                    <div id="myDropdown" className="dropdown-content">
                        <h4 id='dropdownUsername'>{fullname}</h4>
                        <a href="#home">Messages</a>
                        <a href="#about">Notification</a>
                        <a href="#contact">Help</a>
                        <a href="#contact" onClick={() =>dispatch(setLogout())}>Logout</a>
                    </div>
                </div>
            </div>
            {/* <div id='postLiveSearch'>
                df
            </div> */}
        </React.Fragment>
    )
}

const DummyNavbar = () => {
    return(
        <div id='navbarWrapper'>
            <h1 id='dummySocioPedia'>Sociopedia</h1>
        </div>
    )
}

export { Navbar, DummyNavbar }