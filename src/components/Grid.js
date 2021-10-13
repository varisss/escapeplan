import React from "react";

export const Grid = ({ gridArray, theme }) => {
  // const gridArray = [
  //   [0, 0, 3, 0, 0],
  //   [0, 1, 1, 1, 0],
  //   [2, 0, 0, 1, 0],
  //   [0, 1, 0, 1, 4],
  //   [0, 0, 0, 1, 0],
  // ];
  return (
    <div
      className={
        theme === "default"
          ? "grid default"
          : theme === "jungle"
          ? "grid jungle"
          : "grid snow"
      }
    >
      {gridArray.map((row) => {
        return row.map((col) => {
          switch (col) {
            case 0:
              return <div className='block free' />;
            case 1:
              return <div className='block obs' />;
            case 2:
              return <div className='block tunnel' />;
            case 3:
              return <div className='block warder' />;
            case 4:
              return <div className='block prisoner' />;
          }
        });
      })}
    </div>
  );
};
