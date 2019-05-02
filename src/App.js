import React, { Component } from 'react'
import client from './api'
import './styles/main.scss'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import PlayerMenu from './components/PlayerMenu'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
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
        console.log(res)
        this.setState({
          players: res
        })
      })
      .catch(err => {
        console.error('Oh no, error occured: ', err)
      })
  }

  render() {
    return (
      <div className='container'>
        <PlayerMenu
          players={this.state.players}
          togglePlayerMenu={this.handleClick}
          playerMenuOpen={this.state.playerMenuOpen}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
