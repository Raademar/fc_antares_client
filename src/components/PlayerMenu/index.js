import React from 'react'
import PlayerMenuButton from './PlayerMenuButton'
import PlayerSelectMenu from './PlayerSelectMenu'

const PlayerMenu = props => {
  return (
    <div className='player-menu'>
      {props.playerMenuOpen ? (
        <PlayerSelectMenu togglePlayerMenu={props.togglePlayerMenu} />
      ) : (
        props.players.map((player, index) => (
          <PlayerMenuButton
            playerPosition={player.position}
            key={index}
            togglePlayerMenu={props.togglePlayerMenu}
          />
        ))
      )}
    </div>
  )
}

export default PlayerMenu
