import React from 'react'

const FloatingAlert = ({ text, color }) => {
  return (
    <div id='floating-alert' >
        <p 
            style={{ color:color }}
        >{ text }</p>
    </div>
  )
}

export default FloatingAlert