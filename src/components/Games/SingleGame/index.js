import React from 'react'

const SingleGame = props => {
  const {
    home_team,
    away_team,
    time,
    scores,
    played,
    players_attending,
    players_uncertain,
    players_declined
  } = props.gameInfo

  return (
    <div className='single-game-container'>
      <h1>
        {home_team} - {away_team}
      </h1>
    </div>
  )
}

export default SingleGame
