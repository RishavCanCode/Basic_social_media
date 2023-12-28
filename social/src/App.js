
import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/login';
import Signup from './Pages/Register/signup';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Resetpassword from './Pages/Resetpassword/Resetpassword';
import Verifyemail from './Pages/VerifyEmail/Verifyemail';
import Forgotpassword from './Pages/Forgotpassword/Forgotpassword';

function App() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
  console.log(user)
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Profile/:id' element={<Profile/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/verify/email" element={<Verifyemail/>}></Route>
        <Route path="/forgot/password" element={<Forgotpassword/>}></Route>
        <Route path="/reset/password" element={<Resetpassword/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
