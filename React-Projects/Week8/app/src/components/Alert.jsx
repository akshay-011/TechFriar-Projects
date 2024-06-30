import React from 'react'

const Alert = ({ text, color }) => {
  return (
    <div id='floating-alert' style={{ color:color }}>{text}</div>
  )
}

export default Alert