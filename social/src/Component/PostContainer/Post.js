import React, { useEffect, useState } from 'react'
import ProfileImage from "../Images/Profile.png"
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import Shareicon from "../Images/share.png";
import Moreoption from "../Images/more.png";

import anotherlikeicon from "../Images/setLike.png"



import "./post.css"
import axios from 'axios';
import { Await } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Post({post}) {
    const userDetails = useSelector((state)=>state.user);
    let users = userDetails?.user
    const [user, setuser]=useState([]);
    useEffect(() => {
      const getuser = async()=>{
        try{
          const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${post.user}`)
           setuser(res.data)
        }catch(error){
          console.log("error Occured")
        }
      }
      getuser();
    }, [])
    const userId = users.other._id;
    const accesstoken = users.accessToken;

   // const userId ="658525b5a05e6c07d009c561"
    //const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODUyNWI1YTA1ZTZjMDdkMDA5YzU2MSIsInVzZXJuYW1lIjoiUmlzaGF2IiwiaWF0IjoxNzAzMjI1MDY2fQ._9t24i9BjnFDgyKdeYWSz3j9mP4QHHkjyQK7zpQ9fFE"
    const [Like, setLike] = useState([post.like.includes(userId) ? anotherlikeicon : LikeIcon]);
    const [count, setcount] = useState(post.like.length);
    const [Comments, setComments] = useState(post.comments);
    const [commentwriting, setcommentwriting] = useState('');
    const [show, setshow] = useState(false);
      
    const handleLike = async() => {
        if (Like == LikeIcon) {
            await fetch (`http://localhost:5000/api/post/${post._id}/like`, {method:"PUT",headers:{'Content-Type':"application/Json",token:accesstoken}})
            setLike(anotherlikeicon);
            setcount(count + 1);
        }
        else {
            await fetch (`http://localhost:5000/api/post/${post._id}/like`, {method:"PUT",headers:{'Content-Type':"application/Json",token:accesstoken}})
            setLike(LikeIcon)
            setcount(count - 1);
        }
    }

    const addComment = async() => {
        const comment = {
            "postid": `${post._id}`,
            "username": `${users.other.username}`,
            "comment": `${commentwriting}`,
            "profile":`${users.other?.profile}`
        }

       
        await fetch (`http://localhost:5000/api/post/comment/post`, {method:"PUT",headers:{'Content-Type':"application/Json",token:accesstoken}, body:JSON.stringify(comment)})
        setComments(Comments.concat(comment));
    }
    const handleComment = () => {
        addComment();
    }
    console.log(Comments)

    const handleshow = ()=>{
        if(show === false){
          setshow(true)
        }else{
          setshow(false)
        }
      } 
     
      console.log(user)
    return (
        <div className='PostContainer'>
            <div className='SubPostContainer'>
                <div>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        {user.profile == ""? <img src={`${ProfileImage}`} className='PostImage' alt='' /> :<img src={`${user.profile}`} className='PostImage' alt='' />}
                        
                        <div>
                            <p style={{ marginLeft: "5px", textAlign: "start" }}>{user.username}</p>
                            <p style={{ fontSize: "11px", textAlign: "start", marginLeft: 3, marginTop: -13, color: "magenta" }}>Rishu follows you</p>
                        </div>
                        <img src={`${Moreoption}`} className='moreicons' alt='' />
                    </div>
                    <p style={{ textAlign: "start", width: "96%", marginLeft: 10, marginTop: 0 }} >{post.title}</p>
                    {post.image !== '' ? 
                    <img src={`${post.image}`} className='PostImages' alt='' /> : post.video !== '' ? <video className='PostImages' width="700" height="500" controls>
                        <source src={post.video} type="video/mp4"/>
                    </video>: ''
                      }
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", marginLeft: "10px" }}>
                            <div style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}>
                                <img src={`${Like}`} className='iconsforPost' onClick={handleLike} alt='' />
                                <p style={{ marginLeft: "6px" }}>{count}Likes</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 40, cursor: "pointer" }}>
                                <img src={`${CommentIcon}`} className='iconsforPost'onClick={handleshow} alt='' />
                                <p style={{ marginLeft: "6px" }}>{Comments.length} comments</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 180, cursor: "pointer" }}>
                            <img src={`${Shareicon}`} className='iconsforPost' alt='' />
                            <p style={{ marginLeft: "6px" }}>Share</p>
                        </div>
                    </div>
                    
                        {show === true ?

                    <div style={{padding:'10px'}}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={`${users.other.profile}`} className='PostImage' alt='' />
                        {/*<p style={{marginLeft:'6px'}}>Rishav</p>*/}
                        <input type='text' className='commentinput' placeholder='Share your thoughts' onChange={(e) => setcommentwriting(e.target.value)} />
                        <button className='addCommentbtn' onClick={handleComment}>Post</button>
                    </div>
                    {Comments.map((item) => (
                        <div style={{ alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{display:"flex" , alignItems:"center"}}>
                            <img src={`${item.profile}`} className='PostImage' alt='' />
                            <p style={{ marginLeft: '6px' ,fontSize:18, marginTop:6 }}>{item.username}</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ marginLeft: "55px", textAlign:'start' , marginTop:-16 }}>{item.comment}</p>
                        </div>
                        <p style={{ marginLeft: "55px", textAlign:'start' , marginTop:-10 ,color:"#aaa" , fontSize:11 }}>Reply</p>
                        </div>
                    ))}
                    </div>:''
                    }
                </div>


            </div>
            </div>

        
    )
}
