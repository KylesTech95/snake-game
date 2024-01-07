import { useEffect, useRef,useState,useCallback } from 'react';
import './App.css';

function StartBtn({startGame}){
  return (
    <div className="startBtn-container">
      <button id="startBtn" onClick={startGame}>Start</button>
    </div>
  )
}
function Snake({snakeRef,snake}){
  useEffect(()=>{
    console.log(snakeRef.current)
  },[])
  return (
    // style={{'left':`${snake[0].x}px`,'top':`${snake[0].y}px`}}
    <div id="snake" ref={snakeRef} style={{'left':`${snake[0].x}px`,'top':`${snake[0].y}px`}}></div>
  )
  
}
function App() {
  //global
  let canvasRef=useRef()
  let snakeRef=useRef()
  let unitSize=25

  const [snake,setSnake]=useState([{x:0,y:0}])
  const [playing,setPlaying]=useState(false)
  
  //update snake direction
  const keyPress = () => {
    window.addEventListener('keypress',e=>{
      console.log(snakeRef.current)
        //switch statement
        switch(true){
          case e.key==='w':
          console.log('up')
          setSnake(s=>[{x:s[0].x,y:s[0].y-unitSize}])
          break;
          case e.key==='a':
          console.log('left')
          setSnake(s=>[{x:s[0].x-unitSize,y:s[0].y}])
          break;
          case e.key==='s':
          console.log('down')
          setSnake(s=>[{x:s[0].x,y:s[0].y+unitSize}])
          break;
          case e.key==='d':
          console.log('right')
          setSnake(s=>[{x:s[0].x+unitSize,y:s[0].y}])
          break;
          default:
          console.log(undefined)
          break;
        }
    })
  }
useEffect(()=>{
  if(playing)keyPress()
},[playing])
  const startGame = () => {
    //set playing to true
    setPlaying(true)
  }
  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{snakeRef, snake}}/>

      {/*Start button*/}
      <StartBtn {...{startGame}}/>
    </div>
  );
}

export default App;
