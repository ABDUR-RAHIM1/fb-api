// users model 
const userModel = require("../Database/model/users.model")


// get all user
const getAllUser = async (req, res) => {
    const user = await userModel.find()

    res.status(201).json({massege :" get all users", user})
}

// get single user 
const getSingleUser =async (req, res)=>{
    const userId = req.params.id; 
    try {
         
      const user = await userModel.findById({_id : userId})
      const {password , createAt, ...other} = user._doc
      res.json(other)
    } catch (error) {
         console.log(error)
    }
}

// create a user 

const register = async (req, res) => {
   try {
    const newUser = await userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    await newUser.save()
    res.status(200).json({ massege: "user cretaetd", newUser })
   } catch (error) {
        res.status(500).json({massage : error.massage})
   }
}

//  lgoin user
const login =async (req, res) => {
    try {
        const {email , password} = req.body
        const user = await userModel.findOne({email : email});
        if(user && user.password === password){
             res.status(201).json({massege : "user login successfully", user})
        }else{
            res.status(404).json({massege : "not a valid user"})
        }
    } catch (error) {
          res.json({massage : error.massage})
    }
 
}

// update users

const update = async (req, res)=>{
     
 try {
    const userId = req.params.id;
    console.log(userId)
    const updatedUser = await userModel.findOneAndUpdate({_id : userId}, {
         $set : {
             username : req.body.username,
             email : req.body.email,
             password : req.body.password, 
             desc : req.body.desc, 
         }
    })
     res.status(200).json({massege : "updated", updatedUser})
 } catch (error) {
      res.send("ERROR", error)
 }
}

// delete user

const deleteUser =async (req, res)=>{
    const userId = req.params.id;

    try {
         const deletedUser = await userModel.deleteOne({_id : userId})
         res.send("user deleted")

    } catch (error) {
        
    res.send("user Error", error)
    }
}

// get followers 

const followers =async (req, res)=>{
    if(req.body.userId != req.params.id){
        try {
             const user = await userModel.findById(req.params.id)
             const currentUser = await userModel.findById(req.body.userId)
             // condition 
             if(!user.followers.includes(req.body.userId)){
                  await user.updateOne({$push :{followers : req.body.userId}})
                  await currentUser.updateOne({$push :{followings : req.params.id}})
                  res.json({massege : "Follow done"})
             }else{
                 res.json({massege : "you allready follow this ID"})
             }
        } catch (error) {
             res.json(error)
        }
    } else{
         res.json({massege :" you can not follow yourself"})
    }
}

const unfollow =async (req, res)=>{
    if(req.body.userId != req.params.id){
        try {
             const user = await userModel.findById(req.params.id)
             const currentUser = await userModel.findById(req.body.userId)
             // condition 
             if(user.followers.includes(req.body.userId)){
                  await user.updateOne({$pull :{followers : req.body.userId}})
                  await currentUser.updateOne({$pull :{followings : req.params.id}})
                  res.json({massege : "unFollow done"})
             }else{
                 res.json({massege : "you allready unfollow this ID"})
             }
        } catch (error) {
             res.json(error)
        }
    } else{
         res.json({massege :" you can not unfollow yourself"})
    }
}



module.exports = { getAllUser, getSingleUser, register, login , update, deleteUser, followers, unfollow};