import React, { useEffect, useState } from 'react'
import "./rightbar.css"
import ads from "../Images/ads.jpg";
import image1 from "../Images/image3.jpg";



import addFriends from "../Images/add-user.png"
import axios from 'axios';
import Follow from './Follow';
import { useSelector } from 'react-redux';
export default function Rightbar() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
  const id = user.other._id;

  const[users,setusers]=useState([]);
//const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODUyNWI1YTA1ZTZjMDdkMDA5YzU2MSIsInVzZXJuYW1lIjoiUmlzaGF2IiwiaWF0IjoxNzAzMjI1MDY2fQ._9t24i9BjnFDgyKdeYWSz3j9mP4QHHkjyQK7zpQ9fFE"
  useEffect(() => {
    const getuser = async()=>{
      try{
        const res = await axios.get(`http://localhost:5000/api/user/all/user/${id}`)
         setusers(res.data)
      }catch(error){
        console.log("error Occured")
      }
    }
    getuser();
  }, [])

  console.log(users)
  return (
    <div className='rightbar'>
      <div className='rightcontainer'>
      <div className='adsContainer'>
        <img src={`${ads}`} className="adsimg" alt="" />
            <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -30 }}>UnAcademy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy course</p>
            </div>
            </div>
        <div className='adsContainer'>
            
          <img src={`${image1}`} className="adsimg" alt="" />
          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>UnAcademy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy  course</p>
          </div>
        </div>

      </div>
      <div className='rightcontainer2'>
        <h3 style={{textAlign:"start" , marginLeft:"10px"}}>Suggested for you</h3>
          {users.map((item)=>(
              <Follow userdetails={item}/>
              ))}
              
        

        

      </div>

    </div>
  )
}
