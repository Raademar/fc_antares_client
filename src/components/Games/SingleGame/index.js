import React, { useState, useEffect } from 'react'
import DateOfGame from '../../Date'
import TimeOfGame from '../../Time'
import Location from '../../Location'
import Close from '../../Close'
import CircleBack from '../../CircleBack'
import Bell from '../../Bell'
import AttendanceButton from './AttendanceButton'
import AcceptButton from './AcceptButton'

const SingleGame = props => {
  const {
    home_team,
    away_team,
    time,
    scores,
    played,
    where,
    players_attending = [],
    players_uncertain = [],
    players_declined = []
  } = props.gameInfo

  const [activePlayerView, setPlayerView] = useState(players_attending)
  const [activePlayerViewState, setPlayerViewState] = useState('attending')

  const getDateFromShitTime = badTime => {
    const unix = Date.parse(badTime)
    const goodTime = new Date(unix)
    const date = goodTime.getDate()
    const month = goodTime.getMonth()

    const formattedTime = `${date}/${month}`
    return formattedTime
  }
  const getClockFromShitTime = badTime => {
    const unix = Date.parse(badTime)
    const goodTime = new Date(unix)
    const hours = goodTime.getHours()

    const formattedTime = `${hours}:00`
    return formattedTime
  }

  return (
    <div className='single-game-container'>
      <h2>
        {home_team} - {away_team}
      </h2>
      <div className='single-game-info'>
        <span>
          <Location /> {where}
        </span>
        <span>
          <TimeOfGame /> {getClockFromShitTime(time)}
        </span>
        <span>
          <DateOfGame /> {getDateFromShitTime(time)}
        </span>
      </div>
      <div className='single-game-player-status-container'>
        <div className='single-game-player-status-headings'>
          <h2
            onClick={() => {
              setPlayerView(players_attending)
              setPlayerViewState('attending')
            }}
            className={
              activePlayerViewState === 'attending' ? 'active-view' : ''
            }
          >
            Attending
          </h2>
          <h2
            onClick={() => {
              setPlayerView(players_declined)
              setPlayerViewState('declined')
            }}
            className={
              activePlayerViewState === 'declined' ? 'active-view' : ''
            }
          >
            Declined
          </h2>
          <h2
            onClick={() => {
              setPlayerView(players_uncertain)
              setPlayerViewState('uncertain')
            }}
            className={
              activePlayerViewState === 'uncertain' ? 'active-view' : ''
            }
          >
            Uncertain
          </h2>
        </div>
        <div className='single-game-players-active-view'>
          {activePlayerView.map((player, index) => (
            <p key={index}>{player}</p>
          ))}
        </div>
      </div>
      <div className='single-game-secondary-attendance-buttons'>
        <AttendanceButton title='Cannot attend' subtitle='Cheer for us'>
          <Close />
        </AttendanceButton>

        <AttendanceButton title='Not sure' subtitle='Circle back later'>
          <CircleBack />
        </AttendanceButton>

        <AttendanceButton title='Remind me!' subtitle='Save to calendar'>
          <Bell />
        </AttendanceButton>
      </div>
      <AcceptButton />
    </div>
  )
}

export default SingleGame
