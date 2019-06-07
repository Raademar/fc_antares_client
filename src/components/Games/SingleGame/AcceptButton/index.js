import React from 'react'
import MenuArrow from '../../../MenuArrow'
const AcceptButton = props => {
  return (
    <div
      className='single-game-accept-button'
      onClick={() => props.handleAccept('attending')}
    >
      <h2>I WILL ATTEND THIS GAME</h2>
      <MenuArrow strokeColor='#101456' rotationOfArrow='rotate-0' />
    </div>
  )
}

export default AcceptButton
