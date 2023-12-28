import React, { useState } from 'react'
import image1 from "../Images/image3.jpg";
import image2 from "../Images/image5.jpg";
import addFriends from "../Images/add-user.png"
import UserToFollow from "../Images/afterFollowImg.png"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Follow({userdetails}) {
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user
    console.log(user)
    let id = user.other._id
    console.log(id);

    const accessToken=user?.accessToken;


    //const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODUyNWI1YTA1ZTZjMDdkMDA5YzU2MSIsInVzZXJuYW1lIjoiUmlzaGF2IiwiaWF0IjoxNzAzMjI1MDY2fQ._9t24i9BjnFDgyKdeYWSz3j9mP4QHHkjyQK7zpQ9fFE"
    const [Follow ,setFollow] = useState(addFriends);
    const handleFollow = async(e)=>{
        await fetch(`http://localhost:5000/api/user/following/${userdetails._id}` , {method:'PUT', headers:{"Content-Type":"application/JSON",token:accessToken }, body:JSON.stringify({user:`${id}`})})
          setFollow(UserToFollow);
    }
  return (
    <div style={{marginTop:"-10px"}} key={userdetails._id}>
                <div style={{display:'flex', alignItems:'center', justifyContent:"space-between"}}>
                  <Link to={`/Profile/${userdetails._id}`}>
                  <div style={{display:'flex', alignItems:"center"}}>
                      <img src={`${userdetails.profile}`} className='Profileimage' alt='' />
                      <div>
                    <p style={{marginLeft:"10px",textAlign:"start"}}>{userdetails.username}</p>
                    <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"white"}}>Suggested for you</p>
                      </div>  
                  </div>
                  </Link>
                  <div style={{backgroundColor:"white", padding:'3px', marginRight:13, borderRadius:"100%",cursor:'pointer'}} onClick={e=>handleFollow(userdetails._id)}>
                    <img src={`${Follow}`} className='addfriend'alt=''/>
                  </div>
                  </div>
                  
              </div>
  )
}
