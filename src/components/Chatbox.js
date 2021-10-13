import React, { useState, useEffect } from "react";
import { TextField } from '@material-ui/core'

export const Chatbox = ({socket, nickname}) => {
  const [state, setState] = useState({message: "", name:nickname})
  const [chat, setChat] = useState([])

  useEffect(()=> {
    socket.on('message', ({name, message})=> {
      setChat([...chat, {name, message}])
    })
  })

  const onTextChange = e => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const onMessageSubmit = e => {
    e.preventDefault()  //prevent refresh
    const {message} = state
    socket.emit('message', {name:nickname, message})
    console.log(nickname)
    console.log(message)
    setState({message: "", name:nickname})
  }

  const renderChat = () => {
    return chat.map(({name, message}, index)=> (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }
  
  return (

    <div className="card">

      <form onSubmit={onMessageSubmit}>
        <div>
          <TextField name="message" onChange={e=> onTextChange(e)} value={state.message} label="Message" id="outlined-multiline-static" variant="outlined"></TextField>
        </div>
        <button className="btn btn-secondary">Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  
  );
}

