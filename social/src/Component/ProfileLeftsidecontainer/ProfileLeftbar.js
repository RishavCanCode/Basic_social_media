import React, { useEffect, useState } from 'react'
import "./profileleftbar.css"
import image from "../Images/Profile.png"
import image2 from "../Images/image2.jpg"
import { Link, useLocation } from 'react-router-dom'

import axios from 'axios'
import { useSelector } from 'react-redux'
export default function ProfileLeftbar() {
    let location = useLocation();
    let id = location.pathname.split("/")[2];
    console.log(id);
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user
    const [Follow,setUnFollow] = useState((user.other.Following.includes(id)? "Unfollow" : "Follow"))

    const accessToken = user.accessToken;
    console.log(accessToken)


    //const id= user?.other?._id;
    let username = user?.other?.username;
    
    const [users, setuser]=useState([]);
    useEffect(() => {
        const getuser = async()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${id}`)
                setuser(res.data)
            }catch(error){
                console.log("error Occured")
            }
        }
        getuser();
    }, [])
    let followersCounter = users?.Followers?.length;
    let followingCounter = users?.Following?.length;
    console.log(users)
    

    const [Followinguser, setFollowinguser] = useState([]);
    useEffect(() => {
      const getFollowing= async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/api/post/following/${id}`)
            setFollowinguser(res.data);
        }catch(error){
            console.log("Error")

        }
      }
      getFollowing();
    }, [])

    const  handleFollow = async()=> {
        if(Follow === "Follow"){
            await fetch(`http://localhost:5000/api/user/following/${id}` , {method:'PUT', headers:{"Content-Type":"application/JSON",token:accessToken }, body:JSON.stringify({user:`${user.other._id}`})})
              setUnFollow("UnFollow");
    }else{
        await fetch(`http://localhost:5000/api/user/following/${id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , token:accessToken} , body:JSON.stringify({user:`${user.other._id}`})})
        setUnFollow("Follow")
    }
}

    console.log(Followinguser)


  return (
    <div className='ProfileLeftbar'>
        <div className='NotificationsContainer'>
                <img src={`${image}`}  className ="ProfilepageCover" alt=''/>
                     <div style={{display:'flex' , alignItems:'center',marginTop:-30 }}>
                           <img src={`${users.profile}`} className="Profilepageimage" alt="" />   
                           <div>
                           <p style={{marginLeft:6 , marginTop:20 , color:"white" , textAlign:'start'}}>{users.username}</p>
                           <p style={{marginLeft:6 , marginTop:20 , color:"white" , textAlign:"start" , marginTop:-16 , fontSize:11}}>Software Developer</p>
                           </div>
                           
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <p style={{color:"white", marginLeft:20 , fontSize:"14px"}}>Following</p>
                        <p style={{color:"white" , marginRight:20 , fontSize:"12px" , marginTop:17}}>{followingCounter}</p>
                    </div>
                    

                    <div style={{display:'flex' , justifyContent:'space-between' , marginTop:-20}}>
                         <p style={{color:"white", marginLeft:20 , fontSize:"14px"}}>Followers</p>
                        <p style={{color:"white" , marginRight:20 , fontSize:"12px" , marginTop:17}}>{followersCounter}</p>
                    </div>
                    
                    <div style={{marginTop:-20}}>
                        <h5 style={{color:"white", marginLeft:10 , fontSize:"14px" , marginRight:30, marginTop:30 , textAlign:"start"}}>User Bio</h5>
                        <p style={{color:"white"  , fontSize:"12px" , marginTop:-20 , textAlign:"start" , marginLeft:"10px"}}>It takes a strong person to recognise another</p>
                    </div>
                    {user.other._id !== id ? <div onClick={handleFollow}> <button style={{width:"100%" , paddingTop:7 , paddingBottom:7 , border:"none" , backgroundColor:"red" , color:"white"}}>{Follow}</button> </div>: <div><button style={{width:"100%" , paddingTop:7 , paddingBottom:7 , border:"none" , backgroundColor:"green" , color:"white"}}>Edit Bio</button></div> }
                    
                                        
        </div>  
        <div className='NotificationsContainer'>
            <h3 style={{color:'white'}}>Following</h3>
            <div style={{display:"flex" , justifyContent:'space-between'}}>
                <p style={{marginLeft:10, color:'white'}}>Friends</p>
                <p style={{marginRight:10 , color:"white"}}>See all</p>
            </div>

            <div style={{display:'flex' , flexWrap:"wrap" , marginLeft:5}}>
                {Followinguser.map((item)=>(
                    <Link to={`/profile/${item._id}`}>
                <div style={{marginLeft:4 , cursor:"pointer"}} key={item._id}>
                    <img src={`${item.profile}`} className="friendimage"alt=''/>
                    <p style={{color:"white",marginTop:-2}}>{item.username}</p>
                </div>

                </Link>
            ))}
            
                
            </div>
        
    </div>         
    </div>
  )
}
