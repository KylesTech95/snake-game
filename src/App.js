import logo from './logo.svg';
import { useEffect, useRef,useState } from 'react';
import './App.css';

let unitSize=25;
let fillStyle='lime';

function Snake(){
  let myStyles={
    'height':`${unitSize}px`,
    'width':`${unitSize}px`,
    'backgroundColor':`${fillStyle}`,
    'position':'absolute',
    'border-radius':'50%',
    'border': '5px solid green'
  }
  return (
    <div id="snake" style={myStyles}></div>
  )
}

function App() {
//canvas context 2d
const canvas = useRef()
useEffect(()=>{
  let start = {
    x:canvas.current.getBoundingClientRect().x + unitSize,
    y:canvas.current.getBoundingClientRect().y + unitSize
  }
  console.log(start)
})
const [snakePos, setSnakePos] = useState({x:start.x,y:start.y})
console.log(snakePos)
  return (
    <div id="canvas-container">
      <canvas id="canvas-actual" height="500" width="500" ref={canvas}></canvas>
      <Snake/>
    </div>
  );
}

export default App;
