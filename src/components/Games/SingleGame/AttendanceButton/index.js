import React from 'react'

const AttendanceButton = props => {
  const { title, subtitle } = props
  return (
    <button className='attendance-button'>
      {props.children}
      <div className='attendance-button-text-holder'>
        <p className='attendance-button-subtitle'> {subtitle} </p>
        <p className='attendance-button-title'> {title} </p>
      </div>
    </button>
  )
}

export default AttendanceButton
