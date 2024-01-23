import { useEffect,React } from 'react';


export default function Food({playing,createFood,foodX,foodY,snake}) {
  const foodOnSnake=()=>{
    for(let x in snake){
      return !(snake[x].x===foodX&&snake[x].y===foodY)
  }
}
    // if !playing center food in the middle of the canvas
    useEffect(()=>{
      if(playing || foodOnSnake()){
        createFood()
        foodOnSnake()
      }
    },[playing])

  
    return (
      <div className="food-container">
        <div id="food" style={{left:`${foodX}px`,top: `${foodY}px`}}></div>
      </div>
    )
  }