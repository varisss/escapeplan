import React, { useEffect } from "react";

<<<<<<< HEAD
export const Grid = (props) => {
    const gridArray = props.grid;

    // const mapping = {
    //     0: 'freeBlock',
    //     1: 'obstacleBlock',
    //     2: 'tunnelBlock',
    //     3: 'warder',
    //     4: 'prisoner'
    // }
    // const classNameArray;
    console.log(gridArray);
    return (
    <div id='grid'>
=======
export const Grid = ({ theme }) => {
  const gridArray = [
    [0, 0, 3, 0, 0],
    [0, 1, 1, 1, 0],
    [2, 0, 0, 1, 0],
    [0, 1, 0, 1, 4],
    [0, 0, 0, 1, 0],
  ];
  return (
    <div className={theme === "jungle" ? "grid jungle" : "grid snow"}>
>>>>>>> edfba2a85836f1da4db16ad09aadf28d8a4a3e41
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
<<<<<<< HEAD
}
=======
};
>>>>>>> edfba2a85836f1da4db16ad09aadf28d8a4a3e41
