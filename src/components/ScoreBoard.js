import React from 'react';


export default function ScoreBoard({score,scoreRef}){
    return(
    <div className="score-container">
      <div ref={scoreRef} id="score">{score}</div>
    </div>
      )
  }