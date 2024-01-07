import logo from './logo.svg';
import { useEffect, useRef,useState } from 'react';
import './App.css';

function StartBtn({moveSnake}){
  return (
    <div className="startBtn-container">
      <button id="startBtn" onClick={moveSnake}>Start</button>
    </div>
  )
}
function Snake({snakeRef,snake}){
  return (
    <div id="snake" ref={snakeRef} style={{'left':`${snake[0].x}px`,'top':`${snake[0].y}px`}}></div>
  )
}
function App() {
  //global
  let canvasRef=useRef()
  let snakeRef=useRef()
  let unitSize=25

  const [snake,setSnake]=useState([{
    x:0,
    y:0
  }])

  const moveSnake = () => {
    let cW=canvasRef.current.getBoundingClientRect().width
    let constant = 0;
    let snakeInterval = setInterval(()=>{
      //move snake
      setSnake(s=>[{x:s[0].x+unitSize,y:s[0].y}])
      //track snakeX position with constant += 25 units
      constant+=unitSize
      console.log(constant)
      if(constant >= cW-unitSize)clearInterval(snakeInterval)
      },100)

  }
  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{snakeRef, snake}}/>

      {/*Start button*/}
      <StartBtn {...{moveSnake}}/>
    </div>
  );
}

export default App;
