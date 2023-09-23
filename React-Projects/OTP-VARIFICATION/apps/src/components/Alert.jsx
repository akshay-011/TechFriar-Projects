import React from 'react'

const Alert = ({ text, color }) => {
  return (
    <div className='alert-container'>
        <p style={{ color:color }} >{text}</p>
    </div>
  )
}

export default Alert