import { useEffect,React,useState,useCallback } from 'react';

// snake actual
export default function Snake({testArr,snakeInterval,resetGame,snake,playing,setSnake,unitSize,createFood,setScore}){
    const [moving,setMoving] = useState(false)
    const [bodyLength,setBodyLength] = useState(snake.length)
    const [dir,setDir] = useState({
    RIGHT:(param,head,i)=>{
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
        for(let i = 0; i < snake.length-1; i++){
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
      let canvasWidth = 500
      let canvasHeight=500
     console.log('snake is moving')
      snakeInterval = setInterval(()=>{
      // list of methods during move
      moveSnake()
      let head = snake[snake.length-1];
      let last = testArr[testArr.length-1]
    // if food & head both meet, create food
      if(last.x-head.x==0 && last.y-head.y==0){
        createFood()
        setScore(s=>s+1)
      }
      if(head.x < 0 || head.y < 0 || head.x >= canvasWidth || head.y >= canvasHeight ){
        clearInterval(snakeInterval)
        resetGame()
        setKeys(['w'])
      }
     },100)
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