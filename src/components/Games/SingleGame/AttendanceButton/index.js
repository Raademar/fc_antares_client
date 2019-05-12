import React from 'react'

const AttendanceButton = props => {
  const { title, subtitle, icon } = props
  return (
    <button className='attendance-button'>
      {props.children}
      <p className='attendance-button-subtitle'> {subtitle} </p>
      <p className='attendance-button-title'> {title} </p>
    </button>
  )
}

export default AttendanceButton
