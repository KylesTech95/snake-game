import { useEffect, useRef,useState } from 'react';
import './App.css';


function Snake({snakeRef,snake,playing,setPlaying,setGameover,unitSize}){
  const min = 0;
  const max = 475;
  const declareGameOverFn = () => {
    setGameover(true)
    setPlaying(false)
    console.log('game over')
  }
  useEffect(()=>{
    if(playing){
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
            console.log(snakeX, snakeY)
        }
          
      })
    }
  

  },[snakeRef,playing])
  return (
    // style={{'left':`${snake[0].x}px`,'top':`${snake[0].y}px`}}
    <div id="snake" ref={snakeRef} style={{'left':`${snake[0].x}px`,'top':`${snake[0].y}px`}}></div>
  )
  
}
function ScoreBoard({score,setScore}){
  return(
  <div className="score-container">
    <div className="score">{score}</div>
  </div>
    )
}
function Btn({startGame,playing,setPlaying,gameover,setGameover,resetGame,btnColor,setBtnColor,btnRef,btnLable,setBtnLable}){
  useEffect(()=>{
    if(playing){
      setBtnLable('Reset')
      setBtnColor('red')
      btnRef.current.addEventListener('mouseover',e=>{
        let btn = e.target;
        //immediate color change w/o the use of state
        btn.style=`background-color:red;`
        btn.style=`background-color:${btnColor}`
        
      })
      btnRef.current.addEventListener('mouseout',e=>{
        let btn = e.target;
        btn.style=`background-color:none`
      })
    }
    else{
      setBtnLable('Start')
      setBtnColor('green')
      btnRef.current.addEventListener('mouseover',e=>{
        let btn = e.target;
        //immediate color change w/o the use of state
        btn.style=`background-color:green;`
        btn.style=`background-color:${btnColor}`
        
      })
      btnRef.current.addEventListener('mouseout',e=>{
        let btn = e.target;
        btn.style=`background-color:none`
      })
    }
  },[playing,btnColor])
  return (
    <div className="btn-container" ref={btnRef}>
      <button id="btn" onClick={()=>{
        if(playing){
          resetGame()
          console.log(gameover)
        }
        else{
          startGame()
        }
      }}>{btnLable}</button>
    </div>
  )
}









function App() {
  //global
  let canvasRef=useRef()
  let snakeRef=useRef()
  let btnRef = useRef();

  const [snake,setSnake]=useState([{x:0,y:0}])
  const [playing,setPlaying]=useState(false)
  const [gameover,setGameover]=useState(true)
  const [btnColor,setBtnColor]=useState('green')
  const [btnLable,setBtnLable]=useState('Start')
  const [unitSize,setUnitSize]=useState(25)
  const [score,setScore]=useState(0)
  
  //update snake direction
  const keyPress = () => {
    window.addEventListener('keypress',e=>{
      // console.log(snakeRef.current)
        //switch statement
        if(gameover==false){
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
        }
        
    })

}
useEffect(()=>{
  if(playing){
    keyPress()
  }
  if(gameover && score > 0){
    console.log('game is fucking over ')
  }
// eslint-disable-next-line
},[playing])
  const startGame = () => {
    console.log('you pressed start')
    //set playing to true
    setPlaying(true)
    setScore(score + 1)
    setGameover(false)
    setBtnColor('red')
    btnRef.current.addEventListener('mouseover',e=>{
      let btn = e.target;
      //immediate color change w/o the use of state
      btn.style=`background-color:red;`
      btn.style=`background-color:${btnColor}`
      
    })
    btnRef.current.addEventListener('mouseout',e=>{
      let btn = e.target;
      btn.style=`background-color:none`
    })
  }
  const resetGame = () => {
      console.log('you pressed reset')
      //set playing to true
      setPlaying(false)
      setGameover(true)
      setSnake([{x:0,y:0}])
      setBtnColor('green')
      setUnitSize(25)
      btnRef.current.addEventListener('mouseover',e=>{
        let btn = e.target;
        //immediate color change w/o the use of state
        btn.style=`background-color:green;`
        btn.style=`background-color:${btnColor}`
        
      })
    
    btnRef.current.addEventListener('mouseout',e=>{
      let btn = e.target;
      btn.style=`background-color:none`
    })
  }
  
  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{snakeRef, snake,playing,setPlaying,setGameover,unitSize}}/>

      {/*Start button*/}
      <Btn {...{gameover,startGame,resetGame,setPlaying,setGameover,playing,btnColor,setBtnColor,btnRef,btnLable,setBtnLable}}/>
    </div>
  );
}
export default App;
