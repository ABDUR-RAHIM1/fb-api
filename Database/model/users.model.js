const mongoose = require("mongoose");

 const  userSchema = new mongoose.Schema({
      username : {
          type : String,
          required : true,
          unique : true,
      },
      email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true, 
    },
    profilepicture : {
        type : String,
        default : '',
    },
    coverpicture : {
        type : String,
        default : '',
    },
    followers : {
        type : Array,
        default : [],
    },
    followings : {
        type : Array,
        default : [],
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    desc : {
       type : String,
       max :  50
    },
    city : {
        type : String 
    },
    from : {
        type : String 
    },
    relationship : {
        type : Number,
        enum : [1,2,3] 
    },
    createAt : {
        type : Date,
        default : Date.now,
    } 
 })

 const User = mongoose.model("user", userSchema)

 module.exports = User;