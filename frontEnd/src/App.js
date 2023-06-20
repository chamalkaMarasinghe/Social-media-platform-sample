import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import HomePage from './scenes/homepage'
import LoginPage  from './scenes/loginpage'
import ProfilePage from './scenes/profilepage'
import Inbox from './scenes/Inbox'
import { useSelector } from 'react-redux'

function App() {

  //for authorization...sensitive pages should only seen by registered users
  //<Navigate to='' /> is a inbuilt component
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* if requested url is path property the browser load the component in element property*/}
          <Route path='/' element={<LoginPage />} />

          {/* <Route path='/home' element={ <HomePage />} />
          <Route path='/profile/:userID' element={ <ProfilePage />} /> */}

          {/* following pages render only if the user is a authenticated user within the system..checks the token */}
          <Route path='/home' element={ isAuth ? <HomePage /> : <Navigate to='/' />} />
          <Route path='/profile/:userID' element={ isAuth ? <ProfilePage /> : <Navigate to='/' />} />
          <Route path='/inbox/:userID' element={isAuth ? <Inbox /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
