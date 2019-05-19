import React from 'react'
import HamburgerBar from './HamburgerBar'
import MenuArrow from '../MenuArrow'

const Header = props => {
  return (
    <div className='header'>
      {window.location.pathname !== '/' && (
        <MenuArrow
          strokeColor='#E6E6F0'
          rotationOfArrow='rotate-180'
          handleClick={props.handleClick}
        />
      )}
      <HamburgerBar />
    </div>
  )
}

export default Header
