import React, { useState, useReducer } from 'react'
import client from '../../../api'
import DateOfGame from '../../Date'
import TimeOfGame from '../../Time'
import Location from '../../Location'
import Close from '../../Close'
import CircleBack from '../../CircleBack'
import Bell from '../../Bell'
import AttendanceButton from './AttendanceButton'
import AcceptButton from './AcceptButton'
import FlashMessage from '../../FlashMessage'
import nanoid from 'nanoid'

const SingleGame = props => {
  const {
    _id,
    home_team,
    away_team,
    time,
    where,
    players_attending = [],
    players_uncertain = [],
    players_declined = []
  } = props.gameInfo

  const activePlayer = JSON.parse(localStorage.getItem('activePlayer'))

  const [activePlayerView, setPlayerView] = useState(players_attending)
  const [activePlayerViewState, setPlayerViewState] = useState('attending')
  const [displayFlashMessage, setFlashMessageState] = useState(false)

  const initialState = { message: '', classNames: '' }
  const reducer = (state, action) => {
    state.message = action.message
    state.classNames = action.classNames
    return state
  }
  const [state, dispatch] = useReducer(reducer, initialState)

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

  const handleAttendanceStatus = status => {
    client
      .patch(_id)
      .insert('after', `players_${status}[-1]`, [
        {
          _key: nanoid(),
          _type: 'reference',
          _ref: activePlayer.value
        }
      ])
      .commit()
      .then(setAttendanceStatus => {
        console.log('Yey, it worked!')
        console.log(setAttendanceStatus)
        dispatch({
          message: 'Attendance saved!',
          classNames: 'flash-message-success'
        })
        setFlashMessageState(true)
      })
      .catch(err => {
        console.error('Ruh Roh', err.message)
        dispatch({
          message: 'Failed attempt',
          classNames: 'flash-message-danger'
        })
      })
  }
  return (
    <div className='single-game-container'>
      {displayFlashMessage && (
        <FlashMessage
          message={state.message}
          classNames={state.classNames}
          setFlashMessageState={setFlashMessageState}
        />
      )}
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
        <AttendanceButton
          title='Cannot attend'
          subtitle='Cheer for us'
          handleAttendanceStatus={handleAttendanceStatus}
          status='declined'
        >
          <Close />
        </AttendanceButton>

        <AttendanceButton
          title='Not sure'
          subtitle='Circle back later'
          handleAttendanceStatus={handleAttendanceStatus}
          status='uncertain'
        >
          <CircleBack />
        </AttendanceButton>

        <AttendanceButton title='Remind me!' subtitle='Save to calendar'>
          <Bell />
        </AttendanceButton>
      </div>
      <AcceptButton handleAccept={handleAttendanceStatus} />
    </div>
  )
}

export default SingleGame
