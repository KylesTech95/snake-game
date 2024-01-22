import { useEffect,React,useState,useCallback } from 'react';

export default function Keypad({keypadHidden,keypadRef}) {
    useEffect(()=>{
        let keys = document.querySelectorAll('.k')
        for(let x = 0; x < keys.length; x++){
            if(x===0){
                keys[x].style=`left: 25px;`
            }
            if(x===1){
                keys[x].style=`right: 35px;`
            }
            if(x===2){
                keys[x].style=`left:${keypadRef.current.getBoundingClientRect().width/2.5}px;top: 5px`
            }
            if(x===3){
                keys[x].style=`left:${keypadRef.current.getBoundingClientRect().width/2.5}px;bottom: 5px`
            }
        }
    },[])
  return (
    <>
    <div id="keypad-container" ref={keypadRef} style={{display:keypadHidden}}>
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
