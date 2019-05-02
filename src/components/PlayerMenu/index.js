import React from 'react'
import PlayerMenuButton from './PlayerMenuButton'
import MenuArrow from '../MenuArrow'

const PlayerMenu = props => {
  return (
    <div className='player-menu'>
      {props.playerMenuOpen ? (
        <div className='player-select-menu'>
          <MenuArrow rotate='rotate-180' />
          <p>Menu</p>
        </div>
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
