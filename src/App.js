import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import client from './api'
import './styles/main.scss'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Header from './components/Header'
import StartPage from './components/StartPage'
import Games from './components/Games'
import PlayerMenu from './components/PlayerMenu'
import Menu from './components/Menu'
import Select from 'react-select'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      games: [],
      menuOpen: false,
      playerMenuOpen: false,
      singleGameOpen: false,
      singleGame: {},
      activePlayer: {},
      selectActivePlayer: false
    }
  }

  handleClick = () => {
    this.setState({
      playerMenuOpen: !this.state.playerMenuOpen
    })
  }

  toggleSingleGame = game => {
    this.setState({
      singleGame: game,
      singleGameOpen: !this.state.singleGameOpen
    })
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  componentDidMount() {
    const activePlayerFromLocalStorage = localStorage.getItem('activePlayer')
    !activePlayerFromLocalStorage &&
      this.setState({
        selectActivePlayer: !this.state.selectActivePlayer
      })
    client
      .fetch(
        `*[_type == 'players']{
          _id,
        name,
        "position": position->position,
        "image": image.asset->url
      }`
      )
      .then(res => {
        // console.log(res)
        this.setState({
          players: res
        })
      })
      .catch(err => {
        console.error('Oh no, error occured: ', err)
      })

    client
      .fetch(
        `*[_type == 'games']{
          _id,
          away_team,
          home_team,
          scores,
          played,
          "players_attending": players_attending[]->name,
          "players_declined": players_declined[]->name,
          "players_uncertain": players_uncertain[]->name,
          time,
          where
        }`
      )
      .then(res => {
        // console.log(res)
        this.setState({
          games: res
        })
      })
      .catch(err => {
        console.error('Oh no, error occured: ', err)
      })
  }

  handleChange = activePlayer => {
    this.setState({
      activePlayer: activePlayer
    })
    console.log(`Player selected ${activePlayer.label}`)
  }

  handleConfirmOfActivePlayer = () => {
    this.setState(
      {
        selectActivePlayer: !this.state.selectActivePlayer
      },
      () => {
        localStorage.setItem(
          'activePlayer',
          JSON.stringify(this.state.activePlayer)
        )
      }
    )
  }
  handleCancel = () => {
    this.setState({
      selectActivePlayer: !this.state.selectActivePlayer,
      activePlayer: {}
    })
  }

  render() {
    const playerToSelectFrom = this.state.players.map((opt, index) => ({
      label: opt.name,
      value: opt._id
    }))

    const { activePlayer } = this.state

    return (
      <Router>
        <div className='container'>
          <Header
            toggleMenu={this.toggleMenu}
            singleGameOpen={this.state.singleGameOpen}
            handleClick={this.toggleSingleGame}
          />
          <Route
            exact
            path='/'
            render={props => <StartPage {...props} games={this.state.games} />}
          />
          <Route
            exact
            path='/games'
            render={props => (
              <Games
                {...props}
                games={this.state.games}
                singleGame={this.state.singleGame}
                singleGameOpen={this.state.singleGameOpen}
                handleClick={this.toggleSingleGame}
              />
            )}
          />
          <Route
            path='/lineup'
            render={props => (
              <PlayerMenu
                {...props}
                players={this.state.players}
                togglePlayerMenu={this.handleClick}
                playerMenuOpen={this.state.playerMenuOpen}
              />
            )}
          />
          {this.state.menuOpen && (
            <Menu
              isMenuOpen={this.state.menuOpen}
              toggleMenu={this.toggleMenu}
            />
          )}
          {this.state.selectActivePlayer && (
            <div className='select-player-module-container'>
              <h2>Select a player to proceed as.</h2>
              <Select
                options={playerToSelectFrom}
                value={activePlayer}
                onChange={this.handleChange}
                className='select-player-container'
                classNamePrefix='select-player'
              />
              <div className='select-player-button-container'>
                <button
                  className='select-player-confirm'
                  onClick={this.handleConfirmOfActivePlayer}
                >
                  Confirm
                </button>
                <button
                  className='select-player-cancel'
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </Router>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
