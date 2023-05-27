const postModel = require("../Database/model/post.model")
const User = require("../Database/model/users.model")
const { v4: uuidv4 } = require("uuid")

const getPost = async (req, res) => {
    const getPost = await postModel.find()
    res.status(200).json({ massage: "get all post", getPost })
}



// create a post 

const newPost = async (req, res) => {
    try {
        const newPost = await postModel({
            userId: uuidv4(),
            desc: req.body.desc,
        })
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json({ massage: "ERROR", error })
    }
    res.send("create post")
}


/// update post 

const updatePost = async (req, res) => {
    try {
        await postModel.findOneAndUpdate({ userId: req.params.id }, {
            // $set : {
            //     desc : req.body.desc
            // }
            $set: req.body
        })
        res.status(200).json({ massage: "user updated" })
    } catch (error) {
        res.send(error)
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        await postModel.deleteOne({ userId: id })
        res.send("post deleted")
    } catch (error) {
        res.send(error)
    }
}

 


module.exports = { getPost, newPost, updatePost, deletePost };