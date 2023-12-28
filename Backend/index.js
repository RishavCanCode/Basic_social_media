const express = require("express");
const app= express();
const mongoose = require("mongoose");
const dotenv=require("dotenv");
const userRouter= require("./router/user");
const PostRouter= require("./router/Post");
const cors = require("cors");
dotenv.config();

mongoose.connect (process.env.MONGODB).then(()=>
console.log("DB connection Successfull")).catch(()=>{
console.log("Error")})

app.use(express.json())
app.use(cors());
app.use("/api/user",userRouter);
app.use("/api/post",PostRouter);

app.listen(5000,()=>{
    console.log("Server is active now")
})