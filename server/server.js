const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
    cors:{
        allowedHeaders: ['Acces-Control-Allow-Origin']
    }
});

app.use(express.static(__dirname + "/../client/"));

app.get("/",(req,res) => {
    const stream = fs.createReadStream(__dirname + "/../client/index.html");
    stream.pipe(res);
});

io.on("connection", (socket) => {
    console.log("user connected");
    
    socket.on("chat", (msg,name) => {
        console.log(`${name} says ${msg}`);
        socket.broadcast.emit("chat",`${name}|${msg}`)
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

http.listen(3001, () => {console.log("server running at port 3001");});