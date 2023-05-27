const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes');
app.use(express.json())  
app.use(bodyParser.urlencoded({ extended: true })) 

// routes middlewere
app.use('/users', router)

 
// home route 
app.get("/", (req, res)=>{
     res.sendFile(__dirname + '/view/index.html')
})

// error handler
app.use((req, res, next)=>{
     res.sendFile(__dirname + '/view/error.html')
})
module.exports = app;