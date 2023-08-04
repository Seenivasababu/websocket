import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

const App = () => {

  const [room,setRoom] = useState("")
  const [message,setMessage] = useState("")
  const [receivedMessage,setReceivedMessage] = useState("")

  const joinRoom = ( ) =>{
    if(room!==""){
      socket.emit("join_room",room)
    }
  }

  const sendMessage = () => {
    socket.emit("send_message",{message,room})
  }
  useEffect(()=>{
    socket.on('received_message',(data)=>{
      setReceivedMessage(data.message)
    })
  },[socket])

  
  return (
    <div>
      <input value={room} placeholder='Enter room' onChange={(e)=>setRoom(e.target.value)}></input>
      <button onClick={joinRoom}>Join Room</button>
      <input value={message} placeholder='Enter message' onChange={(e)=>setMessage(e.target.value)}></input>
      <button onClick={sendMessage}>Send message</button>
      <h1>Received Message : {receivedMessage}</h1>
    </div>
  )
}

export default App