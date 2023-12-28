import React, { useEffect, useState } from 'react'
import "./mainPost.css"
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from '../PostContainer/Post'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MainPost() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
    console.log(user);
    let id = user?.other?._id;
    const accesstoken = user.accessToken;
    console.log(accesstoken)
 // const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODUyNWI1YTA1ZTZjMDdkMDA5YzU2MSIsInVzZXJuYW1lIjoiUmlzaGF2IiwiaWF0IjoxNzAzMjI1MDY2fQ._9t24i9BjnFDgyKdeYWSz3j9mP4QHHkjyQK7zpQ9fFE"
  const [post, setPost]= useState([]);
  useEffect(()=>{
    const getPost = async ()=>{
      try{
        const res = await axios.get(`http://localhost:5000/api/user/flw/${id}`,{
          headers:{
            token:accesstoken
          }
        })
        setPost(res.data);
      }catch (error){

      }
    }
    getPost();
  }, [])

  console.log(post); 
  return (
    <div className='mainPostContainer'>
      <ContentPost/>
      {post.map((item)=>(
        
          <Post post={item}/>
        
      ))}
      
      
    </div>
  )
}
