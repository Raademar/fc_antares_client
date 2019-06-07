import React from 'react'

const FlashMessage = props => {
  const { message, classNames, setFlashMessageState } = props
  if (!message) {
    return null
  }
  return (
    <div
      className={'flash-message' + ' ' + classNames}
      role='alert'
      onClick={() => setFlashMessageState(false)}
    >
      <p>{message}</p>
    </div>
  )
}

export default FlashMessage
