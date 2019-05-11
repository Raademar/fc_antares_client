import React, { Component } from 'react'
import Game from './Game'

class Games extends Component {
  render() {
    console.log(this.props.games)
    const { games } = this.props
    return (
      <div className='games'>
        <h1>Games</h1>
        <div className='game-container'>
          {games.map((game, index) => (
            <Game game={game} key={index} />
          ))}
        </div>
      </div>
    )
  }
}

export default Games
