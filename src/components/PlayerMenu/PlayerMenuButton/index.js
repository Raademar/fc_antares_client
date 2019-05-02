import React from 'react'
import MenuArrow from '../../MenuArrow'

const PlayerMenuButton = props => {
  return (
    <div className='player-menu-button' onClick={props.togglePlayerMenu}>
      <p>{props.playerPosition}</p>
      <MenuArrow />
    </div>
  )
}

export default PlayerMenuButton
