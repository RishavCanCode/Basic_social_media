const mongoose =require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Followers:{
        type:Array,
       // required:true
    },
    Following:{
        type:Array,
       // required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    profile:{
        type:String      
    },
    verifed:{
        type:Boolean,
        required:true,
        default:false
}
})

module.exports =mongoose.model("User",UserSchema)