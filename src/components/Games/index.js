import React, { Component } from 'react'
import Game from './Game'
import SingleGame from './SingleGame'

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {
      singleGameOpen: false,
      singleGame: {}
    }
  }
  handleClick = game => {
    this.setState({
      singleGame: game,
      singleGameOpen: true
    })
  }
  render() {
    console.log(this.props.games)
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
                this.handleClick(game)
              }}
            />
          ))}
        </div>
        {this.state.singleGameOpen && (
          <SingleGame gameInfo={this.state.singleGame} />
        )}
      </div>
    )
  }
}

export default Games
