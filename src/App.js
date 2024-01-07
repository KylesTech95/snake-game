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

  const [snake,setSnake]=useState([{x:0,y:0}])
  const [playing,setPlaying]=useState(false)
  
  //update snake direction
  const keyPress = () => {
    window.addEventListener('keypress',e=>{
      if(playing){
        //switch statement
        switch(true){
          case e.key=='w':
          console.log('up')
          setSnake(s=>[{x:s[0].x,y:s[0].yunitSize}])
          break;
          case e.key=='a':
          console.log('left')
          setSnake(s=>[{x:s[0].x-unitSize,y:s[0].y}])
          break;
          case e.key=='s':
          console.log('down')
          setSnake(s=>[{x:s[0].x,y:s[0].y+unitSize}])
          break;
          case e.key=='d':
          console.log('right')
          setSnake(s=>[{x:s[0].x+unitSize,y:s[0].y}])
          break;
        }
      }
    })
  }
  useEffect(()=>{
    keyPress()
  },[playing])
  const moveSnake = () => {
    setPlaying(true)
    let cW=canvasRef.current.getBoundingClientRect().width
    let cH=canvasRef.current.getBoundingClientRect().height
    let constant = 0;
    let snakeInterval = setInterval(()=>{
      //move snake
      setSnake(s=>[{x:s[0].x+unitSize,y:s[0].y}])
      //track snakeX position with constant += 25 units
      constant+=unitSize
      if(constant >= cW-unitSize||constant >= cH-unitSize||constant < 0)clearInterval(snakeInterval)
      },1500)

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
