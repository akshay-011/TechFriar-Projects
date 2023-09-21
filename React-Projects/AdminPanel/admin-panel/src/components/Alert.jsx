import React from 'react'

const Alert = ({ text, color }) => {
  return (
    <div id='alert' >
        <p style={{ color:color }}> {text} </p>
    </div>
  )
}

export default Alert