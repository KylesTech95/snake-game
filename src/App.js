import { useEffect, useRef,useState,useCallback } from 'react';
import './App.css';


function Snake({snakeRef,snake,playing,resetGame,unitSize}){
  const min = 0;
  const max = 475;
  useEffect(()=>{
    if(!playing){
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
          resetGame()
          break;
          case +snakeY > max:
          resetGame()
          break;
          case +snakeX < min:
          resetGame()
          break;
          case +snakeY < min:
          resetGame()
          break;
          default:
            console.log(snakeX, snakeY)
        }
          
      })
    }
  

  },[snakeRef,playing])
  return (
    <>
    {snake.map((snek,index)=>(
      <div className="snake" ref={snakeRef} key={index} style={{'left':`${snek.x}px`,'top':`${snek.y}px`}}></div>
    ))}
    </>
    
  )
  
}

 function Food({food,setFood}) {

  return (
    <div className="food-container">
      <div id="food"></div>
    </div>
  )
}

function ScoreBoard({score,setScore}){
  return(
  <div className="score-container">
    <div id="score">{score}</div>
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
        btn.style=`border:none;background-color:red;`
        btn.style=`border:none;background-color:${btnColor}`
        
      })
      btnRef.current.addEventListener('mouseout',e=>{
        let btn = e.target;
        btn.style=`border:none;background-color:none`
      })
    }
    else{
      setBtnLable('Start')
      setBtnColor('green')
      btnRef.current.addEventListener('mouseover',e=>{
        let btn = e.target;
        //immediate color change w/o the use of state
        btn.style=`border:none;background-color:green;`
        btn.style=`border:none;background-color:${btnColor}`
        
      })
      btnRef.current.addEventListener('mouseout',e=>{
        let btn = e.target;
        btn.style=`border:none;background-color:none`
      })
    }
  },[playing,btnColor])
  return (
    <div className="btn-container" ref={btnRef}>
      <button id="btn" onClick={()=>{
        if(playing){
          resetGame()
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
  let unitSize = 25;
  const [snake,setSnake]=useState([{x:0,y:0},{x:unitSize,y:0},{x:unitSize*2,y:0}])
  const [food,setFood]=useState([{x:undefined,y:undefined}])
  const [playing,setPlaying]=useState(false)
  const [gameover,setGameover]=useState(true)
  const [btnColor,setBtnColor]=useState('green')
  const [btnLable,setBtnLable]=useState('Start')
  const [score,setScore]=useState(0)
  const handleKey = event => {
    // console.log(snakeRef.current)
        //switch statement
        switch(true){
          case event.key==='w':
          console.log('up')
          setSnake(s=>[{x:s[0].x,y:s[0].y-unitSize}])
          break;
          case event.key==='a':
          console.log('left')
          setSnake(s=>[{x:s[0].x-unitSize,y:s[0].y}])
          break;
          case event.key==='s':
          console.log('down')
          setSnake(s=>[{x:s[0].x,y:s[0].y+unitSize}])
          break;
          case event.key==='d':
          console.log('right')
          setSnake(s=>[{x:s[0].x+unitSize,y:s[0].y}])
          break;
          default:
          console.log(undefined)
          break;
        }
  }
  const memoizedListener = useCallback(handleKey, [])
useEffect(()=>{
    //update snake direction
    

  if(playing){
    window.addEventListener('keypress',memoizedListener)
    return () => {
      window.removeEventListener('keypress',memoizedListener);
    }
  }
  else{
    return () => {
      window.removeEventListener('keypress',memoizedListener);
    };
  }
// else{
//   return () => {
//     window.removeEventListener('keypress',memoizedListener);
//   };
// }
  
  if(gameover && score > 0){
    console.log('game is fucking over ')
  }
// eslint-disable-next-line
},[playing,memoizedListener])


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
      btn.style=`border:none;background-color:red;`
      btn.style=`border:none;background-color:${btnColor}`
      
    })
    btnRef.current.addEventListener('mouseout',e=>{
      let btn = e.target;
      btn.style=`border:none;background-color:none`
    })
  }
  const resetGame = () => {
      setScore(0)
      console.log('game is reset')
      //set playing to true
      setPlaying(false)
      setGameover(true)
      setSnake([{x:0,y:0}])
      setBtnColor('green')
      btnRef.current.addEventListener('mouseover',e=>{
        let btn = e.target;
        //immediate color change w/o the use of state
        btn.style=`border:none;background-color:green;`
        btn.style=`border:none;background-color:${btnColor}`
        
      })
    
    btnRef.current.addEventListener('mouseout',e=>{
      let btn = e.target;
      btn.style=`border:none;background-color:none`
    })
  }
  
  return (
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height="500" width="500"/>
      <Snake {...{resetGame,snakeRef,snake,playing,unitSize}}/>
      <Food {...{food,setFood}}/>
      <ScoreBoard  {...{score}}/>
      {/*Start button*/}
      <Btn {...{gameover,startGame,resetGame,setPlaying,setGameover,playing,btnColor,setBtnColor,btnRef,btnLable,setBtnLable}}/>
    </div>
  );
}
export default App;
