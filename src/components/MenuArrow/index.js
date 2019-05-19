import React from 'react'

const MenuArrow = props => {
  return (
    <svg
      className={props.rotationOfArrow}
      width='11'
      height='14'
      viewBox='0 0 11 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 1L9 7L1 13'
        stroke={props.strokeColor}
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default MenuArrow
