require("dotenv").config()
const express = require('express');
const app = express();
var http= require("http").Server(app);
const port = process.env.PORT
var path = require("path");
var io = require("socket.io")(http);

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
 
io.on('connection',function(socket){
    console.log("A user Connected");
    socket.on("disconnect",function(){
        console.log("All user Disconnected");
    })
})
//creating the server at given port 
http.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});





