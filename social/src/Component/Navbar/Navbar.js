import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom';
import searchIcon from "../Images/search.png";
import Notifications from "../Images/bell.png";
import Message from "../Images/message.png";
import Profileimage from "../Images/Profile.png"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxContainer/userReducer';
export default function Navbar(){
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user
    console.log(user);
    let id = user?.other?._id;
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        dispatch(logout())

    }
    return (
        <div className='mainNavbar'>
            <div className='LogoContainer'>
            
                <p1>Dosti</p1>
                
            </div>
            <div>
                  <div className='searchInputContainer'>
                    <img src={`${searchIcon}`} className="searchIcon" alt=''/>
                    <input type='text'className='searchInput' placeholder='search people' name=''id=''/>
                  </div>
            </div>
            <div className='IconsContainer'>
                <img src={`${Notifications}`} className="Icons"alt=''/>
                <img src={`${Message}`}className="Icons"alt=''/>
                <Link to={`/profile/${id}`}>
                <div style={{display:'flex' , alignItems:'center'}}>
                     <img src={`${user.other.profile}`} className="ProfileImage"alt=''/>
                     <p style={{marginLeft:'5px'}}></p>
                     <p>{user.other.username}</p>
                </div>
                </Link>
                <div>
                    <p style={{marginRight:"30px" , marginLeft:"20px" , cursor:"pointer"}} onClick={handleLogout}>
                        Logout
                    </p>
                </div>
            </div>
        </div>
    )
}