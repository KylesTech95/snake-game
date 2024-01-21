import React from 'react';


export default function ScoreBoard({score}){
    return(
    <div className="score-container">
      <div id="score">{score}</div>
    </div>
      )
  }