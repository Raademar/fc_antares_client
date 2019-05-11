import React from 'react'
import HamburgerBar from './HamburgerBar'
import MenuArrow from '../MenuArrow'

const Header = () => {
  return (
    <div className='header'>
      <MenuArrow rotate='rotate-180' />
      <HamburgerBar />
    </div>
  )
}

export default Header
