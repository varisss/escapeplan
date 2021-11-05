import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import smile from "../images/emoji-smile.png";
import laugh from "../images/emoji-laugh.png";
import cry from "../images/emoji-cry.png";
import mad from "../images/emoji-mad.png";

export const Chatbox = ({ socket, nickname, playerId, sendEmoji, emoji }) => {
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
  }, [socket, chat]);

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
        <h3 className='chat-name'>
          {name ? name : id === playerId ? "You" : "Opponent"}:{" "}
          <span className='message'>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className='chat-container'>
      <div className='emoji-card'>
        <i className='smile far fa-smile' onClick={() => sendEmoji("smile")} />
        <i
          className='laugh far fa-laugh-squint'
          onClick={() => sendEmoji("laugh")}
        />
        <i className='cry far fa-sad-cry' onClick={() => sendEmoji("cry")} />
        <i className='mad far fa-angry' onClick={() => sendEmoji("mad")} />
      </div>
      <div className='chat-card'>
        <div
          className='emoji'
          style={{
            backgroundImage: `url(${
              emoji === "smile"
                ? smile
                : emoji === "laugh"
                ? laugh
                : emoji === "cry"
                ? cry
                : emoji === "mad"
                ? mad
                : ""
            }`,
            backgroundSize: "cover",
          }}
        />
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
    </div>
  );
};
