import React from 'react'

const Game = props => {
  return (
    <div>
      <p> {props.game.home_team} </p>
      <p> {props.game.away_team} </p>
    </div>
  )
}

export default Game
