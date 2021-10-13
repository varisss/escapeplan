import React, { useEffect } from "react";

export const Chatbox = (props) => {
    useEffect(()=> {
    socket.on('message', ({name, message})=> {
      setChat([...chat, {name, message}])
    })
  })
  
  return (
    // <div className={theme === "jungle" ? "grid jungle" : "grid snow"}>
    //   {gridArray.map((row) => {
    //     return row.map((col) => {
    //       switch (col) {
    //         case 0:
    //           return <div className='block free' />;
    //         case 1:
    //           return <div className='block obs' />;
    //         case 2:
    //           return <div className='block tunnel' />;
    //         case 3:
    //           return <div className='block warder' />;
    //         case 4:
    //           return <div className='block prisoner' />;
    //       }
    //     });
    //   })}
    // </div>
  );
}

