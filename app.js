require("dotenv").config()
const express = require('express');
const app = express();
var http = require("http").Server(app);
const port = process.env.PORT
var path = require("path");
var io = require("socket.io")(http);

//middle are 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    var options = {
        root: path.join(__dirname)

    }
    var fileName = "index.html";
    res.sendFile(fileName, options);
});
// This is for broadcasting the message 
var user = 0;
io.on('connection', function (socket) {
    console.log("A user Connected");
    user++; // increment by 1 when any user connects 

    //this is for displaying/broadcasting message how many user connected ...
    //broadcast is not the  custome event it is inbuilt evdent of the socket.io lib 
    //io.sockets.emit('broadcast', { message: user + " users connected!" })
    socket.emit("newUserConnect",{message:"hye...welcome dear... "})

    socket.broadcast.emit("newUserConnect",{message:user+" Users Connected"});
    // //sending the meesage from the server which will be catch by the client 
    // setTimeout(function(){
    // socket.emit('myCustomEvent',{description:'A custom message from the server side!',message:"This is the message from me"}
    //   );
    // //socket.send("<h1>Sent Message from Server Side by Prereserved events</h1>"); 
    // },3000)


    //getting the message from the client
    // socket.on('fromClient',function(data){
    //     console.log("Message from the client:\n\t")
    //     console.log(data)
    //     //document.write(data)
    // })


    socket.on("disconnect", function () {
        console.log("All user Disconnected");
        user--; // increment by 1 when any user connects 
        //io.sockets.emit('broadcast', { message: user + " users connected!" })
        socket.broadcast.emit("newUserConnect",{message:user+" Users Connected"});
    })
})
//creating the server at given port 
http.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
