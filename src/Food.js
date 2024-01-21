import { useEffect,React } from 'react';


export default function Food({playing,createFood,foodX,foodY}) {
    // if !playing center food in the middle of the canvas
    useEffect(()=>{
      if(playing){
        createFood()
      }
    },[playing])
  
    return (
      <div className="food-container">
        <div id="food" style={{left:`${foodX}px`,top: `${foodY}px`}}></div>
      </div>
    )
  }