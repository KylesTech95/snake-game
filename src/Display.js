import { useEffect,React,useState,useCallback } from 'react';

export default function Display({display,setDisplay,displayRef}) {
  return (
    <div id="display-container">
        <p ref={displayRef} id="display">{display}</p>
    </div>
  )
}
