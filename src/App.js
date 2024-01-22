import { useEffect,React,useRef,useState } from 'react';
import './App.css';
import Food from './Food.js'
import ScoreBoard from './ScoreBoard.js'
import Snake from './Snake.js'
import Btn from './Btn.js'
import Display from './Display.js'
import Keypad from './Keypad.js'

// store an empty array
let testArr=[]
let snakeInterval;

function App() {
  //global
  let canvasRef=useRef()
  let btnRef = useRef()
  let displayRef = useRef()
  let scoreRef = useRef()
  let keypadRef = useRef()
  let unitSize = 25;
  const [display,setDisplay]=useState('Start game')
  let snakeOrigin=[{x:0,y:0},{x:unitSize,y:0},{x:unitSize*2,y:0},{x:unitSize*3,y:0},{x:unitSize*4,y:0}]
  const [snake,setSnake] = useState(snakeOrigin)
  const [tracker,setTracker]=useState([snake[snake.length-1]])
  const [playing,setPlaying]=useState(false)
  const [gameover,setGameover]=useState(true)
  const [btnColor,setBtnColor]=useState('green')
  const [btnLable,setBtnLable]=useState('Start')
  const [score,setScore]=useState(0)
  const [foodX,setFoodX]=useState(0)
  const [foodY,setFoodY]=useState(0)
  const [keys,setKeys] = useState(['d']) // start key tracking with d (RIGHT)
  const [keypadHidden,setKeypadHidden]=useState('block')

  useEffect(()=>{
    let halfCanvasWidth = canvasRef.current.children[0].width/2;
    let halfCanvasHeight = canvasRef.current.children[0].height/2;
    if(gameover){
      setFoodX(halfCanvasWidth)
      setFoodY(halfCanvasHeight)
      setSnake(snakeOrigin)
    }
// eslint-disable-next-line
  },[gameover])

  //type function
  function autoTextFn(text, heading,speed) {
    text = [...text]//text.split``
    let i = 0, arr = [], len = text.length
    let timer = setInterval(() => {
      let take = text.shift(text[i])
      i += 1
      arr.push(take)
      heading.textContent = arr.join``
      // console.log(text)//sender
      // console.log(arr)//receiver
      // console.log(arr.length,len)//compare arr's length w/ original text length
      if (arr.length === len) clearInterval(timer)//clearInterval once both lengths are the same.
    }, speed)
  }
  // start game
  const startGame = () => {
    autoTextFn('Game started...Win as many rounds as you can!',displayRef.current,35)
    console.log('you pressed start')
    //set playing to true
    setPlaying(true)
    setScore(score + 1)
    setGameover(false)
    setBtnColor('red')
    console.log(keys)

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
  // reset game
  const resetGame = () => {
      let finalScore = scoreRef.current.textContent
      setTimeout(()=>{
        autoTextFn(`You Completed ${finalScore} Round${finalScore=='1'?'': 's'}! Play again!`,displayRef.current,35)
      },score > 1 ? 750 : 2000)
      testArr=[];
      setTracker([])
      setScore(0)
      console.log('game is reset')
      // console.log(snake)
      // console.log(tracker)
      // console.log(keys)
      // console.log('food pos: '+ [foodX,foodY])
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
  // generate random food
  const randomFood = (min,max) => {
    // ensure the difference of (max-min) is mod by 25(unitSize)
    let modCheck = (max,min) =>{
      let result = Math.floor(Math.random()*(max-min))
      // until the query is true, use recursion
      return result % unitSize !== 0 ? modCheck(max++,min) : result
    }
  let randomNum = modCheck(max,min)
  // console.log(randomNum)
  return randomNum
}
  // create food
  const createFood=()=>{
    let canvasWidth = canvasRef.current.children[0].width;
    let canvasHeight = canvasRef.current.children[0].height;
    let FX=randomFood(0,canvasWidth - (unitSize))
    let FY=randomFood(0,canvasHeight - (unitSize))
    testArr.push({x:FX,y:FY})
    setFoodX(()=>testArr[testArr.length-1].x)
    setFoodY(()=>testArr[testArr.length-1].y)
  }
  return (
    <>
    <div id="canvas-container" ref={canvasRef}>
      <canvas id="canvas-actual" height={window.innerHeight <= 1000 ? "400" : "500"} width={window.innerWidth <= 428 ? "400" : "500"}/>
      <Snake {...{
        canvasRef,
        setDisplay,
        displayRef,
        autoTextFn,
        scoreRef,
        tracker,
        setTracker,
        keys,
        setKeys,
        snakeInterval,
        resetGame,
        snake,
        playing,
        setGameover,
        setSnake,
        unitSize,
        createFood,
        setScore,
        score,
        testArr
        }}/>
      <Food {...{
        snake,
        playing,
        createFood,
        foodX,
        foodY,
        }}/>
      <ScoreBoard  {...{score,scoreRef}} />
      <Keypad {...{keypadHidden,keypadRef}}/>
      {/*Start/Reset button*/}
      <Btn {...{
        startGame,
        playing,
        resetGame,
        btnColor,
        setBtnColor,
        btnRef,
        btnLable,
        setBtnLable,
        }}/>
    </div>
    <Display {...{display,setDisplay,displayRef}}/>
  </>
  );
}
export default App;
