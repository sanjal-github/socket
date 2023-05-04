require("dotenv").config()
const express = require('express');
const app = express();
const port = process.env.PORT
var path = require("path");

//middle are 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",function(req,res){
    var options={
        root: path.join(__dirname)

    }
    var fileName = "index.html";
    res.sendFile(fileName,options);
});
//creating the server at given port 
app.listen(port,(req,res)=>{
    console.log(`Listening at port ${port}`);
})





