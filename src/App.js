import React, { Component } from 'react'
import client from './api'
import './styles/main.scss'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
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
        <h1>Hejsan</h1>
        {this.state.players.map((player, index) => (
          <div key={index}>
            <h5>{player.name}</h5>
            <p>{player.position}</p>
            <img
              src={player.image}
              alt='Player of FC Antares'
              key={index}
              className='player-card-image'
            />
          </div>
        ))}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
