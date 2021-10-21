import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

export const Chatbox = ({ socket, nickname, playerId }) => {
  const [state, setState] = useState({
    message: "",
    name: nickname,
    id: playerId,
  });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    document.querySelector(".render-chat").scrollTop =
      document.querySelector(".render-chat").scrollHeight;
    socket.once("message", ({ name, message, id }) => {
      console.log(chat);
      setChat([...chat, { name, message, id }]);
    });
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault(); //prevent refresh
    const { message } = state;
    socket.emit("message", { name: nickname, message, id: playerId });
    console.log(nickname);
    console.log(message);
    console.log(playerId);
    setState({ message: "", name: nickname, id: playerId });
  };

  const renderChat = () => {
    return chat.map(({ name, message, id }, index) => (
      <div key={index}>
        <h3>
          {name ? name : id === playerId ? "You" : "Opponent"}:{" "}
          <span className='message'>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className='card'>
      <div className='chat-header'>
        <h1>Chat</h1>
      </div>
      <div className='render-chat'>{renderChat()}</div>
      <form className='chat-form' onSubmit={onMessageSubmit}>
        <div>
          <TextField
            name='message'
            className='textfield'
            onChange={(e) => onTextChange(e)}
            value={state.message}
            label='Message'
            id='outlined-multiline-static'
            variant='outlined'
          ></TextField>
        </div>
        <button className='sendbutton btn btn-secondary'>Send</button>
      </form>
    </div>
  );
};
