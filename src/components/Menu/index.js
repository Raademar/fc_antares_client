import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Route, Link } from 'react-router-dom'

const Menu = props => {
  const [loaded, didLoad] = useState(false)

  useEffect(() => {
    didLoad(true)
  })

  return (
    <CSSTransition
      in={loaded}
      classNames='menu'
      timeout={400}
      unmountOnExit
      onEnter={() => didLoad(true)}
      onExited={() => didLoad(false)}
      key={1}
    >
      <div className='burger-menu'>
        <span onClick={props.toggleMenu}>&times;</span>
        <div className='link-holder'>
          <Link to='/games' onClick={props.toggleMenu}>
            Games
          </Link>
          <Link to='/lineup' onClick={props.toggleMenu}>
            Lineup
          </Link>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Menu
