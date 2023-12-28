import React, { useEffect, useState } from 'react'
import "./profilemainpost.css"
import Coverimage from "../Images/Profile.png"
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from '../ProfilePostContainer/Post'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function ProfileMainPost() {
  const [post , setPost] =useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];
 // const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODUyNWI1YTA1ZTZjMDdkMDA5YzU2MSIsInVzZXJuYW1lIjoiUmlzaGF2IiwiaWF0IjoxNzAzMjI1MDY2fQ._9t24i9BjnFDgyKdeYWSz3j9mP4QHHkjyQK7zpQ9fFE"
  useEffect(() => {
    const getPost =async()=>{
      try{
         const res = await axios.get(`http://localhost:5000/api/post/get/post/${id}`)
         setPost(res.data);
      }catch (error){
         console.log("error occured")
      }
    } 
    getPost();
  }, [])
  
  return (
    <div className='ProfilemainPostContainer'>
        <div>
            <img src={`${Coverimage}`} className='ProfileCoverimage' alt=''/>
            <h2 style={{marginTop:-43,color:"white",textAlign:"start",marginLeft:"34px"}}>Your Profile</h2>
        </div>
      <ContentPost/>
      {post.map((item)=>(
        <Post detail={item}/>
      ))}
      
  
    </div>
  )
}
