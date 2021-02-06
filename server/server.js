const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
    cors:{
        allowedHeaders: ['Acces-Control-Allow-Origin']
    }
});

io.on("connection", (socket) => {
    console.log("user connected");
    
    socket.on("chat", (msg) => {
        console.log(msg);
        socket.broadcast.emit("chat", msg)
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

http.listen(3001, () => {console.log("app running at port 3001");});