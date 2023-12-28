import React, { useEffect, useState } from 'react'
import "./profilerightbar.css"

import axios from 'axios';
import Follow from '../RightsideContainer/Follow';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
export default function ProfileRightbar() {
  const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user
    let location = useLocation();
    let id = location.pathname.split("/")[2];
    let idforSuggest =user?.other?._id

  const [Followinguser, setFollowinguser] = useState([]);
    useEffect(() => {
      const getFollowing= async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/api/post/followers/${id}`)
            setFollowinguser(res.data);
        }catch(error){
            console.log("Error")

        }
      }
      getFollowing();
    }, [])
    console.log(Followinguser)

    const[users,setusers]=useState([]);
//  const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODUyNWI1YTA1ZTZjMDdkMDA5YzU2MSIsInVzZXJuYW1lIjoiUmlzaGF2IiwiaWF0IjoxNzAzMjI1MDY2fQ._9t24i9BjnFDgyKdeYWSz3j9mP4QHHkjyQK7zpQ9fFE"
  useEffect(() => {
    const getuser = async()=>{
      try{
        const res = await axios.get(`http://localhost:5000/api/user/all/user/${idforSuggest}`)
          
         setusers(res.data);
      }catch(error){
        console.log("error Occured")
      }
    }
    getuser();
  }, [])

  console.log(users)


  return (
    <div className='Profilerightbar'>
      <div className='profilerightcontainer'>
        <h3>Followers</h3>
        <div>
          {Followinguser.map((item)=>(
          <div style ={{marginTop:"10px"}}>
            <div div style={{display:'flex' , alignItems:"center" , marginLeft:10 , cursor:"pointer"}}>
                <img src={`${item.profile}`} className="Friendsimage"alt=''/>
                <p style={{textAlign:"start"  , marginLeft:"10p"}}>{item.username}</p>
            </div>
            </div>
            ))}
            
            
            
            
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
