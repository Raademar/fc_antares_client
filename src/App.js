import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import client from './api'
import './styles/main.scss'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Header from './components/Header'
import StartPage from './components/StartPage'
import Games from './components/Games'
import PlayerMenu from './components/PlayerMenu'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      games: [],
      playerMenuOpen: false
    }
  }

  handleClick = () => {
    console.log('clicked')
    this.setState({
      playerMenuOpen: !this.state.playerMenuOpen
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
        away_team,
        home_team,
        scores,
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
          <Header />
          <Route
            exact
            path='/'
            render={props => <StartPage {...props} games={this.state.games} />}
          />
          <Route
            exact
            path='/games'
            render={props => <Games {...props} games={this.state.games} />}
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
        </div>
      </Router>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
