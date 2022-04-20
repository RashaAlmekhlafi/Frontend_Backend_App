
// import './App.css';

import Login from './screens/login/login'
import Logout from './screens/logout'
import Signup from './screens/signup'
import Profile from './screens/profile'
import UpdateProfile from './screens/UpdateProfile'
import UserHome from './screens/Home'
import AddNewPost from './screens/add-new-post'
import UsersList from './screens/usersList'
import AdminShowUser from './screens/admin-showUser'

import {BrowserRouter as Router,Navigate, Route, Routes} from 'react-router-dom';
import {useSelector} from 'react-redux'
import Navbar from './components/Nav/nav'

function App() {
  
  const loggedIn=useSelector((state)=>state.auth.loggedIn)
  console.log(loggedIn)

  return (
   
    <Router>
      {loggedIn ? <Navbar/>: <></> }

      
        <Routes>
       
        <Route exact path="/" element={<Login/>} />
        
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/Home" element={<UserHome/>}/> 
        <Route path="/add-new-post" element={<AddNewPost/>}/> 
        <Route path="/edit-post/:id" element={<AddNewPost/>}/> 
        <Route path="/edit-profile" element={<UpdateProfile/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/usersList" element={<UsersList/>}/>
        <Route path="/admin-showUser/:Username/:id" element={<AdminShowUser/>}/>
        <Route path="/admin-showUserProfile/:id" element={<Profile/>}/>
       
        </Routes>
        
      </Router>
  );
}

export default App;
