import logo from './logo.svg';
import { useEffect, useRef,useState } from 'react';
import './App.css';

function StartBtn({handleUpdateSnake}){
  return (
    <div className="startBtn-container">
      <button id="startBtn" onClick={handleUpdateSnake}>Start</button>
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
  let bod = document.querySelector('body')
  let bodWidth = bod.getBoundingClientRect().x;
  let bodHeight = bod.getBoundingClientRect().y;
  const [snakeX,setSnakeX] = useState(0)
  const [snakeY,setSnakeY] = useState(0)
  const [key,setKey] = useState('ArrowRight')
// useEffect
useEffect(()=>{
  window.addEventListener('keydown',e=>{
    let canvas = canvasRef.current,
      cW=canvas.getBoundingClientRect().width
      if(e.key === key){
        if(snakeX < (cW-unitSize)){
          setSnakeX(snakeX+unitSize)
        }
        console.log(key)
      }
  })
},[key])
// handleUpdateSnake
const handleUpdateSnake=()=>{
  let canvas = canvasRef.current,
      cW=canvas.getBoundingClientRect().width
      if(snakeX < (cW-unitSize)){
        setSnakeX(snakeX + unitSize)
        console.log(snakeX)
      }
      else{
        setSnakeX(snakeX - unitSize)
        console.log('you reached the end')
      }
}
  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{snakeRef,snakeX,snakeY}}/>

      {/*Start button*/}
      <StartBtn {...{handleUpdateSnake}}/>
    </div>
  );
}

export default App;
