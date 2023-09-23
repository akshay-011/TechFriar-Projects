import React from 'react'
import PostOffice from './PostOffice'

const ShowPostOffices = ({ offices }) => {
  return (
    <div id='card-container' >
        {
            offices.map((office, index) => {
                return(
                    <PostOffice {...office} key={index} />
                )
            })
        }
    </div>
  )
}

export default ShowPostOffices