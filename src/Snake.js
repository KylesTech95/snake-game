import { useEffect,React,useState,useCallback } from 'react';
// snake actual
export default function Snake({myAgent,setMyAgent,setDisplay,canvasRef,scoreRef,tracker,setTracker,keys,setKeys,testArr,snakeInterval,resetGame,snake,playing,setSnake,unitSize,createFood,setScore,score}){
    const [moving,setMoving] = useState(false)
    const [dir,setDir] = useState({
    RIGHT:(param,head,i)=>{
      if(i===head){
        param[i].x = param[i].x + unitSize
        // param[i].y = param[i].y 
      }
      else{
        param[i].x = param[i+1].x
        param[i].y = param[i+1].y
      }
    },
    LEFT:(param,head,i)=>{
      if(i===head){
        param[i].x = param[i].x - unitSize
        // param[i].y = param[i].y 
      }
      else{
        param[i].x = param[i+1].x
        param[i].y = param[i+1].y
      }
    },
    UP:(param,head,i)=>{
      if(i===head){
        param[i].y = param[i].y - unitSize
        // param[i].x = param[i].x
      }
      else{
        param[i].x = param[i+1].x
        param[i].y = param[i+1].y
      }
    },
    DOWN:(param,head,i)=>{
      if(i===head){
        param[i].y = param[i].y + unitSize
        // param[i].x = param[i].x
      }
      else{
        param[i].x = param[i+1].x
        param[i].y = param[i+1  ].y
      }
    }
    
    })
    useEffect(()=>{
      return window.navigator.userAgent.match(/iphone|samsung/i) ? setMyAgent('touchstart'): setMyAgent('click');
    },[])
    // trackKeys fn
    const trackKeys = (event) =>{
      if(playing){
        let key = event.key || window
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
    
    }
    const trackKeysKeyPad = (event) =>{
      if(playing){
        let convertKey;
        let key = event.target.classList || window
        switch(true){
          case key.contains('key-up'):
            convertKey='w'
          setKeys(keys.push(convertKey))
          break;
          case key.contains('key-down'):
            convertKey='s'
            console.log(key)
          setKeys(keys.push(convertKey))
          break;
          case key.contains('key-left'):
            convertKey='a'
            console.log(key)
          setKeys(keys.push(convertKey))
          break;
          case key.contains('key-right'):
            convertKey='d'
            console.log(key)
          setKeys(keys.push(convertKey))
          break;
          default:
          console.log(undefined)
          break;
        }
      }
    
    } 
    const handleKeyPad = event => {
      let btn = event.target
      let head = snake.length-1
      const updateFn = (param,key,head) => {
        for(let i = 0; i < param.length-1; i++){
          let convertKey;
          switch(true){
            case btn.classList.contains('key-up'):
              console.log('up')
              convertKey='w'
            setDir(dir.UP(param,head,i))
            break;
            case btn.classList.contains('key-left'):
              console.log('left')
              convertKey='a'
            setDir(dir.LEFT(param,head,i))
            break;
            case btn.classList.contains('key-down'):
              console.log('down')
              convertKey='s'
            setDir(dir.DOWN(param,head,i))
            break;
            case btn.classList.contains('key-right'):
              console.log('right')
              convertKey='d'
            setDir(dir.RIGHT(param,head,i))
            break;
            default:
              console.log(undefined)
            break;
          }
          //push all snake-body-objects into the array
          setTracker(tracker.push(snake[i]))
        }
      }
      // console.log(snakeRef.current)
          //switch statement
          switch(true){
            case btn.classList.contains('key-up'):
            console.log('up')
            updateFn(snake,event.key,head)
            break;
            case btn.classList.contains('key-left'):
            console.log('left')
            updateFn(snake,event.key,head)
            break;
            case btn.classList.contains('key-down'):
            console.log('down')
            updateFn(snake,event.key,head)
            break;
            case btn.classList.contains('key-right'):
            console.log('right')
            updateFn(snake,event.key,head)
            break;
            default:
            console.log(undefined)
            break;
          }
    }
    // handle key event
    const handleKey = event => {
      let head = snake.length-1
      const updateFn = (param,key,head) => {
        for(let i = 0; i < param.length-1; i++){
          switch(true){
            case key==='w':
            setDir(dir.UP(param,head,i))
            break;
            case key==='a':
            setDir(dir.LEFT(param,head,i))
            break;
            case key==='s':
            setDir(dir.DOWN(param,head,i))
            break;
            case key==='d':
            setDir(dir.RIGHT(param,head,i))
            break;
            default:
              console.log(undefined)
            break;
          }
          //push all snake-body-objects into the array
          setTracker(tracker.push(snake[i]))
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
    const moveSnake=(interval,width,height,rh)=>{
      let head = snake.length-1;
      // manipulate snake body with a "for" loop
      for(let i = 0; i < snake.length; i++){
        // mothod for changing snake's direction
        let currentDir = keys[keys.length-1]
        switch(true){
          case currentDir==='d':
          setDir(dir.RIGHT(snake,head,i))
          break;
          case currentDir==='w':
          setDir(dir.UP(snake,head,i))
          break;
          case currentDir==='a':
          setDir(dir.LEFT(snake,head,i))
          break;
          case currentDir==='s':
          setDir(dir.DOWN(snake,head,i))
          break;
          default:
          console.log(undefined)
          break;
        }
    
        //push all snake-body-objects into the array
        setTracker(tracker.push(snake[i]))
      }
      // target snake's body and cut off the head
      let snake_body = [...snake].slice(0,-1)
      // filter snake's body by comparing it with snake's head.
      // if the array is empty, then false else true  
      let snake_collapses = snake_body.filter((bod=>bod.x===rh.x&&bod.y===rh.y)||[]).length!==0
      // slice off the last bodyLength (snake length).
      // bodyLength will increase by 1 everytime snake eats the food. (coming soon...)
      if(rh.x < 0 || rh.y < 0 || rh.x >= width || rh.y >= height || snake_collapses){
        clearInterval(interval)
        setDisplay(d=>d='')
        setKeys(['d'])
        resetGame()
        setDir(dir)
      }
      
    }
    // settime out to start snake on START
    const startSnakeMove = () => {
      let canvasWidth=canvasRef.current.children[0].clientWidth
      let canvasHeight=canvasRef.current.children[0].clientHeight
      console.log('snake is moving')
      snakeInterval = setInterval(()=>{
      // list of methods during move
      let realHead = snake[snake.length-1];
      let last = testArr[testArr.length-1];
      let tail = {x:snake[0].x,y:snake[0].y}
      moveSnake(snakeInterval,canvasWidth,canvasHeight,realHead);
    // if food & head both meet, create food
      if(last.x-realHead.x===0 && last.y-realHead.y===0){
        createFood()
        setScore(s=>s+1)
        setSnake(snake=[tail,...snake])
        setTimeout(()=>{
          setDisplay(scoreRef.current.textContent)
        },2000)
      }
     },myAgent=='touchstart'||canvasRef.current.clientWidth < 500?200:100)
    }

    // callbacks
    // eslint-disable-next-line
    const memoizedListener4 = useCallback(trackKeysKeyPad,[playing])
    // eslint-disable-next-line
    const memoizedListener3 = useCallback(handleKeyPad,[playing])
    // eslint-disable-next-line
    const memoizedListener2 = useCallback(trackKeys,[playing])
    // eslint-disable-next-line
    const memoizedListener = useCallback(handleKey, [playing]) 
    // if moving is true, start snake movement
    useEffect(()=>{
    if(moving) {
      startSnakeMove()
      window.addEventListener('keypress',memoizedListener)
      window.addEventListener('keypress',memoizedListener2)
      window.addEventListener(myAgent,memoizedListener3);
      window.addEventListener(myAgent,memoizedListener4);
      return () => {
        clearTimeout(snakeInterval)
        setDir(dir)
        setKeys(['d'])
        window.removeEventListener('keypress',memoizedListener);
        window.removeEventListener('keypress',memoizedListener2);
        window.removeEventListener(myAgent,memoizedListener3);
        window.removeEventListener(myAgent,memoizedListener4);
      }
    }
    else{
      return () => {
        window.removeEventListener('keypress',memoizedListener);
        window.removeEventListener('keypress',memoizedListener2);
        window.removeEventListener(myAgent,memoizedListener3);
        window.removeEventListener(myAgent,memoizedListener4);
        };
      }
      // eslint-disable-next-line
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