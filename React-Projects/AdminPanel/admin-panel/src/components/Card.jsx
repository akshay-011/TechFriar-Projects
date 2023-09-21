import React from 'react'

const Card = ({user, navigation}) => {
  return (
        <div id="show-container" onClick={() => {
            navigation("/user/"+user.username)
        }} >
            <section className="card">
                <div className="head">
                    <p className="heading">{user.name}</p>
                </div>
                <div className="body">
                <p className="body-text">{user.username}</p>
                <p className="body-text">{user.email}</p>
                <p className="body-text">{user.phoneNumber}</p>
                <p className="body-text">{user.address}</p>
                <sub></sub>
                </div>
            </section>
        </div>
  )
}

export default Card