import React, { Component } from 'react'
import client from './api'
import './styles/main.scss'

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
        position,
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
          <img src={player.image} alt='' key={index} />
        ))}
      </div>
    )
  }
}

export default App
