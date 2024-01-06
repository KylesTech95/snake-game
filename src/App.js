import logo from './logo.svg';
import { useEffect, useRef,useState } from 'react';
import './App.css';

function StartBtn({snakeMoves}){
  return (
    <div className="startBtn-container">
      <button id="startBtn">Start</button>
    </div>
  )
}

function Snake({snakeRef,snakeX,snakeY}){
  let snakePos = {
    'left':`${snakeX}px`,
    'top':`${snakeY}px`
  }
  return (
    <div id="snake" ref={snakeRef} style={snakePos}></div>
  )
}
function App() {
  //global  
  let canvasRef=useRef()
  let snakeRef=useRef()
  let unitSize=25
  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{snakeRef}}/>

      {/*Start button*/}
      <StartBtn/>
    </div>
  );
}

export default App;
