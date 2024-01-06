import logo from './logo.svg';
import { useEffect, useRef,useState } from 'react';
import './App.css';

function Snake({snakeRef}){
  return (
    <div id="snake" ref={snakeRef}></div>
  )
}
function App() {
  //global  
  let canvasRef=useRef()
  let snakeRef=useRef()
  let unitSize=5;
  const [sides,setSides] = useState({x:undefined,y:undefined})
useEffect(()=>{
  let tmp_sides = {
    x: canvasRef.current.getBoundingClientRect().x,
    y: canvasRef.current.getBoundingClientRect().y
  }
  let bod = document.querySelector('body')
  let bodWidth = bod.getBoundingClientRect().x;
  let bodHeight = bod.getBoundingClientRect().y;
  setSides(sides.x=(bodWidth/tmp_sides.x),
           sides.y=(bodHeight/tmp_sides.y)  )
  // declare snake's position
  snakeRef.current.style=`left:${sides.x}px;top:${sides.y}px;`
},[])

  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{snakeRef}}/>
    </div>
  );
}

export default App;
