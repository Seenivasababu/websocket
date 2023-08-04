const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
const http = require('http')
const Server = require('socket.io')

const server = http.createServer()

const io = Server(server,{
    cors : {
        origin : 'http://localhost:3000'
    }
})

io.on('connection',(socket)=>{
    console.log(`Connect ${socket.id}`);

    socket.on('join_room',(room)=>{
        socket.join(room)
    })
    socket.on("send_message",(data)=>{
        console.log(data.message);
        socket.to(data.room).emit('received_message',data)
    })
})


server.listen(3001,()=>{
    console.log("Server up and running");
})