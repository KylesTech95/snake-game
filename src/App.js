import { useEffect, useRef,useState,useCallback } from 'react';
import './App.css';


function Snake({snakeRef,snake,playing,gameover,score,setSnake,unitSize}){
  const min = 0;
  const max = 475;
  const [snake2,setSnake2] = useState([{x:0,y:0},{x:unitSize,y:0},{x:unitSize*2,y:0}])
  useEffect(()=>{
    if(!playing){
      window.addEventListener('keydown',e=>{
      return null 
      })
    }
  },[snakeRef,playing])

  const handleKey = (event) => {
    if(event.key==='d'){
      console.log(event.key)
      for(let body of snake2){
        console.log(body)
        body.x+=unitSize
      }
    }
  }
  const memoizedListener = useCallback(handleKey, [])
useEffect(()=>{
  if(gameover && score > 0){
    console.log('game is over ')
  }
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

 },[playing,memoizedListener])

  return (
    <>
    {snake2.map((snek,index)=>(
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
      <Snake {...{gameover,score,resetGame,snakeRef,snake,playing,unitSize}}/>
      <Food {...{food,setFood}}/>
      <ScoreBoard  {...{score}}/>
      {/*Start button*/}
      <Btn {...{gameover,startGame,resetGame,setPlaying,setGameover,playing,btnColor,setBtnColor,btnRef,btnLable,setBtnLable}}/>
    </div>
  );
}
export default App;
