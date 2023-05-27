const express = require("express"); 
const { getAllUser, register, login, update, deleteUser, getSingleUser, followers, unfollow } = require("../controllers/auth.controllers");
const {getPost, newPost, updatePost, deletePost, postLike} = require("../controllers/post.controllers");
const router = express.Router()


//post route 
router.get("/", getAllUser)
// get single user 
router.get("/one/:id", getSingleUser)
// cratee a user 
router.post('/register', register)
// login user
router.post('/login', login)
// update user
router.put('/update/:id', update)
// delete user
router.delete('/delete/:id', deleteUser)
// get followers
router.put('/follow/:id', followers)
// unfollow
router.put('/unfollow/:id', unfollow)

//////     get users post , update , delete etc routes 

router.get("/post", getPost)
/// create post 
router.post("/new-post", newPost)
// update post 
router.put("/postUpdate/:id", updatePost)
// deleete post 
router.delete("/postDelete/:id", deletePost) 


///     router exports 
module.exports = router;