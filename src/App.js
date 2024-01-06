import logo from './logo.svg';
import { useEffect, useRef,useState } from 'react';
import './App.css';

function StartBtn(){
  return (
    <div className="startBtn-container">
      <button id="startBtn">Start</button>
    </div>
  )
}
function Snake({snakeRef}){
  return (
    <div id="snake" ref={snakeRef}></div>
  )
}
function App() {
  //global  
  let canvasRef=useRef()
  let snakeRef=useRef()
  let unitSize=25
  const [sides,setSides] = useState({x:undefined,y:undefined})
  useEffect(()=>{
    let tmp_sides = {
      x: canvasRef.current.getBoundingClientRect().x,
      y: canvasRef.current.getBoundingClientRect().y
    }
    let bod = document.querySelector('body')
    let bodWidth = bod.getBoundingClientRect().x;
    let bodHeight = bod.getBoundingClientRect().y;
    // setSides state to body's width / x & body's width / y
    setSides(sides.x=(Math.floor(bodWidth/(tmp_sides.x))),
            sides.y=(Math.floor(bodHeight/tmp_sides.y))  
            )
    //uncomment tests below for snake unitSize
    {/*
    // test snake movementX: +unitSize
    // setSides(sides.x = sides.x + unitSize,
    //   sides.y = sides.y) 
    // test snake movementX: -unitSize
    // setSides(sides.x = sides.x - unitSize,
    //   sides.y = sides.y)
     // test snake movementY: +unitSize
    //  setSides(sides.x = sides.x,
    //   sides.y = sides.y + unitSize)
    // test snake movementY: -unitSize
    // setSides(sides.x = sides.x,
    //   sides.y = sides.y - unitSize)
  */}
    // declare snake's position
    snakeRef.current.style=`left:${sides.x}px;top:${sides.y}px;`
  },[])

  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{snakeRef}}/>

      {/*Start button*/}
      <StartBtn />
    </div>
  );
}

export default App;
