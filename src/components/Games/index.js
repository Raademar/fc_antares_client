import React, { Component } from 'react'
import Game from './Game'
import SingleGame from './SingleGame'

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { games } = this.props
    return (
      <div className='games'>
        <h1>Games</h1>
        <div className='games-container'>
          {games.map((game, index) => (
            <Game
              game={game}
              key={index}
              singleGameOpen={this.state.singleGameOpen}
              handleClick={() => {
                this.props.handleClick(game)
              }}
            />
          ))}
        </div>
        {this.props.singleGameOpen && (
          <SingleGame gameInfo={this.props.singleGame} />
        )}
      </div>
    )
  }
}

export default Games
