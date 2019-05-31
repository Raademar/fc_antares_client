import React from 'react'
import Bell from '../../Bell'
import Edit from '../../Edit'

const Game = props => {
  const { home_team, away_team, time, scores, played } = props.game

  const getDateFromShitTime = badTime => {
    Date.parse(badTime)
    const goodTime = new Date(badTime)
    const date = goodTime.getDate()
    const month = goodTime.getMonth()

    const formattedTime = `${date}/${month}`
    return formattedTime
  }
  const getClockFromShitTime = badTime => {
    Date.parse(badTime)
    const goodTime = new Date(badTime)
    const hours = goodTime.getHours()

    const formattedTime = `${hours}:00`
    return formattedTime
  }
  return (
    <div
      className='game'
      onClick={() => {
        props.handleClick(props.game)
      }}
    >
      <div className='game-teams-attending'>
        <p> {home_team} </p>
        <p> {away_team} </p>
      </div>
      {played ? (
        <div className='game-scores'>
          <p>{scores.home_team_goals}</p>
          <p>{scores.away_team_goals}</p>
        </div>
      ) : (
        <div className='game-time'>
          <p>{getClockFromShitTime(time)}</p>
          <p>{getDateFromShitTime(time)}</p>
        </div>
      )}
      <div className='game-icon'>{played ? <Edit /> : <Bell />}</div>
    </div>
  )
}

export default Game
