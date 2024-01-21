import { useEffect,React } from 'react';

export default function Btn({snakeInterval,startGame,playing,resetGame,btnColor,setBtnColor,btnRef,btnLable,setBtnLable}){
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