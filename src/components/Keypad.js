import { useEffect,React,useState,useCallback } from 'react';

export default function Keypad({setKeypadHidden,keypadHidden,keypadRef}) {
    useEffect(()=>{
      window.onload=()=>{
        let keys = document.querySelectorAll('.k')
        for(let x = 0; x < keys.length; x++){
            if(x===0){
                keys[x].style=`left: 5px;position:absolute;`
            }
            if(x===1){
                keys[x].style=`right: 0px;position:absolute;`
            }
            if(x===2){
                keys[x].style=`left:${keypadRef.current.getBoundingClientRect().width/2.5}px;top: -20px;position:absolute;`
            }
            if(x===3){
                keys[x].style=`left:${keypadRef.current.getBoundingClientRect().width/2.5}px;bottom: -20px;position:absolute;`
            }
        }
        if(window.innerWidth <= 1300){
            setKeypadHidden('visible')
        }
      }
        
    },[])
  return (
    <>
    <div id="keypad-container" ref={keypadRef} style={{visibility:keypadHidden}}>
      <ul className="keypad-list">
        <div className="k key-left material-symbols-outlined">arrow_back</div>
        <div className="k key-right material-symbols-outlined">arrow_forward</div>
        <div className="k key-up material-symbols-outlined">arrow_upward</div>
        <div className="k key-down material-symbols-outlined">arrow_downward</div>
      </ul>
    </div>
    </>
  )
}
