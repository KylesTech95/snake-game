import { useEffect, useRef,useState,useCallback } from 'react';
import './App.css';

function Food({food,setFood,playing,unitSize,canvasRef}) {
  // if !playing center food in the middle of the canvas
  useEffect(()=>{
    let foodX;
    let foodY;
    let canvasWidth = canvasRef.current.children[0].width;
    let canvasHeight = canvasRef.current.children[0].height;
    const createFood=()=>{
      const randomFood = (min,max) => {
      let randomNum = Math.floor(Math.random()*(max-min)+min)
      return randomNum
    }
     foodX = randomFood(0,canvasWidth - (unitSize))
     foodY = randomFood(0,canvasHeight - (unitSize))
    console.log({x:foodX,y:foodY})
    setFood({x:foodX,y:foodY})
    }
    if(playing){
      createFood()
    }
  },[playing])

  return (
    <div className="food-container">
      <div id="food" style={{left:`${food.x}px`,top: `${food.y}px`}}></div>
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
// snake actual
function Snake({snake,playing,setSnake,unitSize,gameover}){
const [moving,setMoving] = useState(false)
const [bodyLength,setBodyLength] = useState(3)
const [dir,setDir] = useState({RIGHT:(param,head,i)=>{
  if(i===head){
    param[i].x = param[i].x + unitSize
    param[i].y = param[i].y 
  }
  else{
    param[i].x = param[i+1].x
    param[i].y = param[i+1].y
  }
},
LEFT:(param,head,i)=>{
  if(i===head){
    param[i].x = param[i].x - unitSize
    param[i].y = param[i].y 
  }
  else{
    param[i].x = param[i+1].x
    param[i].y = param[i+1].y
  }
},
UP:(param,head,i)=>{
  if(i===head){
    param[i].y = param[i].y - unitSize
    param[i].x = param[i].x
  }
  else{
    param[i].x = param[i+1].x
    param[i].y = param[i+1].y
  }
},
DOWN:(param,head,i)=>{
  if(i===head){
    param[i].y = param[i].y + unitSize
    param[i].x = param[i].x
  }
  else{
    param[i].x = param[i+1].x
    param[i].y = param[i+1  ].y
  }
}

})
// store an empty array for tracking keypresses
const [keys,setKeys] = useState(['d']) // start key tracking with d (RIGHT)

// store an empty array
let arr = []
// trackKeys fn
const trackKeys = (event) =>{
    let key = event.key
    switch(true){
      case key==='w':
        console.log(key)
      setKeys(keys.push(key))
      break;
      case key==='a':
        console.log(key)
      setKeys(keys.push(key))
      break;
      case key==='s':
        console.log(key)
      setKeys(keys.push(key))
      break;
      case key==='d':
        console.log(key)
      setKeys(keys.push(key))
      break;
      default:
      console.log(undefined)
      break;
    }

}
// memoized listener2
const memoizedListener2 = useCallback(trackKeys,[])

// handle key event
const handleKey = event => {
  console.log(keys)
  let head = snake.length-1
  const updateFn = (param,key,head) => {
    for(let i = 0; i < snake.length; i++){
      switch(true){
        case key==='w':
        setDir(dir.UP(snake,head,i))
        break;
        case key==='a':
        setDir(dir.LEFT(snake,head,i))
        break;
        case key==='s':
        setDir(dir.DOWN(snake,head,i))
        break;
        case key==='d':
        setDir(dir.RIGHT(snake,head,i))
        break;
        default:
          console.log(undefined)
        break;
      }
      //push all snake-body-objects into the arra
      arr.push(param[i])
    }
  }
  // console.log(snakeRef.current)
      //switch statement
      switch(true){
        case event.key==='w':
        console.log('up')
        updateFn(snake,event.key,head)
        break;
        case event.key==='a':
        console.log('left')
        updateFn(snake,event.key,head)
        break;
        case event.key==='s':
        console.log('down')
        updateFn(snake,event.key,head)
        break;
        case event.key==='d':
        console.log('right')
        updateFn(snake,event.key,head)
        break;
        default:
        console.log(undefined)
        break;
      }
}

// snake moves
const moveSnake=()=>{
  let head = snake.length-1;
  let tail = 0;
  // manipulate snake body with a "for" loop
  for(let i = 0; i < snake.length; i++){
    // mothod for changing snake's direction
    let currentDir = keys[keys.length-1]
    switch(true){
      case currentDir=='d':
      setDir(dir.RIGHT(snake,head,i))
      break;
      case currentDir=='w':
      setDir(dir.UP(snake,head,i))
      break;
      case currentDir=='a':
      setDir(dir.LEFT(snake,head,i))
      break;
      case currentDir=='s':
      setDir(dir.DOWN(snake,head,i))
      break;
      default:
      console.log(undefined)
      break;
    }

    //push all snake-body-objects into the arra
    arr.push(snake[i])
  }
  // slice off the last bodyLength (snake length).
  // bodyLength will increase by 1 everytime snake eats the food. (coming soon...)
  let last3 = arr.slice(-bodyLength)
  setSnake(last3)
}
// settime out to start snake on START
const startSnakeMove = () => {
 console.log('snake is moving')
 let snakeInterval = setInterval(()=>{
  // list of methods during move
  moveSnake()
 },1000)
}

// useCallback for keypress
const memoizedListener = useCallback(handleKey, []) 
// if moving is true, start snake movement
useEffect(()=>{
if(moving) {
  startSnakeMove()
  window.addEventListener('keypress',memoizedListener)
  window.addEventListener('keypress',memoizedListener2)
  return () => {
    window.removeEventListener('keypress',memoizedListener);
    window.removeEventListener('keypress',memoizedListener2);
  }
}
else{
  return () => {
    window.removeEventListener('keypress',memoizedListener);
    window.removeEventListener('keypress',memoizedListener2);
  };
}
},[moving])
// if playing is true or game has started, set moving to true
useEffect(()=>{
if(playing){
  setMoving(true)
}
else{
  setMoving(false)
}
},[playing])
  // return
  return (
    <>
    {/*map over the snake array & set position w/ style*/}
    {snake.map((snaker,key) => (
      <div className='snake' key={key} style={{left:`${snaker.x}px`,top:`${snaker.y}px`}}/>
    ))}
    </>
  )
}



function App() {
  //global
  let canvasRef=useRef()
  let btnRef = useRef();
  let unitSize = 25;
  const [snake,setSnake] = useState([{x:0,y:0},{x:unitSize,y:0},{x:unitSize*2,y:0}])
  const [food,setFood]=useState({x:undefined,y:undefined})
  const [playing,setPlaying]=useState(false)
  const [gameover,setGameover]=useState(true)
  const [btnColor,setBtnColor]=useState('green')
  const [btnLable,setBtnLable]=useState('Start')
  const [score,setScore]=useState(0)

  useEffect(()=>{
    let halfCanvasWidth = canvasRef.current.children[0].width/2;
    let halfCanvasHeight = canvasRef.current.children[0].height/2;
    if(gameover){
      setFood({x:halfCanvasWidth,y:halfCanvasHeight})
    }
  },[gameover])
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
      <Snake {...{snake,playing,setSnake,unitSize,gameover}}/>
      <Food {...{food,setFood,playing,unitSize,canvasRef}}/>
      <ScoreBoard  {...{score}}/>
      {/*Start button*/}
      <Btn {...{gameover,startGame,resetGame,setPlaying,setGameover,playing,btnColor,setBtnColor,btnRef,btnLable,setBtnLable}}/>
    </div>
  );
}
export default App;
