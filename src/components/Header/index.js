import React from 'react'
import HamburgerBar from './HamburgerBar'
import MenuArrow from '../MenuArrow'

const Header = () => {
  return (
    <div className='header'>
      {window.location.pathname != '/' && <MenuArrow />}
      <HamburgerBar />
    </div>
  )
}

export default Header
