import { useEffect, useRef,useState,useCallback } from 'react';
import './App.css';

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
  let btnRef = useRef();
  let unitSize = 25;
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
      <Food {...{food,setFood}}/>
      <ScoreBoard  {...{score}}/>
      {/*Start button*/}
      <Btn {...{gameover,startGame,resetGame,setPlaying,setGameover,playing,btnColor,setBtnColor,btnRef,btnLable,setBtnLable}}/>
    </div>
  );
}
export default App;
