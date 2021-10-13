import React, {useEffect} from 'react'

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
}