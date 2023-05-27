const mongoose = require("mongoose");

 const  userSchema = new mongoose.Schema({
     
    userId : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    image : {
        type : String, 
    },
    like : {
        type : Array,
        default : []
    },
    createAt : {
        type : Date,
        default : Date.now,
    } 
 })

 const Post = mongoose.model("Post", userSchema)

 module.exports = Post;