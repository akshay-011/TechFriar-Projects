import axios from 'axios'
import React from 'react'

const BookedItems = ({ history, accept }) => {
    
  return (
    <div style={{
        display:'flex',
        flexDirection:'column'
    }} >
        {
            history.map((value, index) => {
                if(!(index%2 === 0)){
                    return null
                }
                return (
                    <section style={{
                        display:'flex',
                        flexDirection:'row'
                    }} >
                        <div>{value.name}</div>
                        {
                            value.isBooked && value.isCanceled
                            ?
                            <button 
                                className='btn yellow'
                                onClick={() => {
                                    accept(value.vehicle_id);
                                }}
                            >
                                Pending
                            </button>
                            :
                            <p className='btn green'>Clear</p>
                        }
                    </section>
                )
            })
        }
    </div>
  )
}

export default BookedItems