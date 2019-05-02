import React from 'react'
import MenuArrow from '../../MenuArrow'

const PlayerSelectMenu = props => {
  return (
    <div className='player-select-menu' onClick={props.togglePlayerMenu}>
      <MenuArrow rotate='rotate-180' />
      <p>Menu</p>
    </div>
  )
}

export default PlayerSelectMenu
