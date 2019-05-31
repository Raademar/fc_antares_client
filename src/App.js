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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      games: [],
      menuOpen: false,
      playerMenuOpen: false,
      singleGameOpen: false,
      singleGame: {}
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
    client
      .fetch(
        `*[_type == 'players']{
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

  render() {
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
        </div>
      </Router>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
