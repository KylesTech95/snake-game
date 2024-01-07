import { useEffect, useRef,useState } from 'react';
import './App.css';

function StartBtn({startGame}){
  return (
    <div className="startBtn-container">
      <button id="startBtn" onClick={startGame}>Start</button>
    </div>
  )
}
function Snake({snakeRef,snake,setPlaying,setGameover,unitSize}){
  const min = 0;
  const max = 475;
  const declareGameOverFn = () => {
    setGameover(true)
    setPlaying(false)
    console.log('game over')
  }
  useEffect(()=>{
    // [snakeX,snakeY].every(s=>{
    //   if(s>=max||s<=min){
    //     setGameover(true)
    //     setPlaying(false)
    //     console.log('game over')
    //   }
    // })
    window.addEventListener('keydown',e=>{
      // format snake positions (left/top) to remove 'px' (ex: '25px' => 25)
      let snakeX =  +snakeRef.current.style.left.replace(/px/,'')
      let snakeY = +snakeRef.current.style.top.replace(/px/,'')
    //switch statement to increase/decrease units based on key press (w,a,s,d)
      switch(true){
        case e.key==='w':
        snakeY-=unitSize
        break;
        case e.key==='a':
        snakeX-=unitSize
        break;
        case e.key==='s':
        snakeY+=unitSize
        break;
        case e.key==='d':
        snakeX+=unitSize
        break;
        default:
        console.log(undefined)
        break;
      }
      switch(true){
        case +snakeX > max:
        declareGameOverFn()
        break;
        case +snakeY > max:
        declareGameOverFn()
        break;
        case +snakeX < min:
        declareGameOverFn()
        break;
        case +snakeY < min:
        declareGameOverFn()
        break;
        default:
        console.log(undefined)
        break;
      }
        console.log(snakeX, snakeY)
    })

  },[snakeRef])
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
  const [gameover,setGameover]=useState(true)
  
  //update snake direction
  const keyPress = () => {
    window.addEventListener('keypress',e=>{
      // console.log(snakeRef.current)
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
// eslint-disable-next-line
},[playing])
  const startGame = () => {
    //set playing to true
    setPlaying(true)
    setGameover(false)
  }
  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{snakeRef, snake,setPlaying,setGameover,unitSize}}/>

      {/*Start button*/}
      <StartBtn {...{startGame}}/>
    </div>
  );
}

export default App;
