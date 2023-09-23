import React from 'react'

const PostOffice = ({ Block, BranchType, Circle, Country, DeliveryStatus, District, Division, Name, Region }) => {
  return (
    <div className='card'>
        <section>
            <label>Name : </label>
            <p> {Name}</p>
        </section>
        
        <section>
            <label>Block : </label>
            <p> {Block}</p>
        </section>


        <section>
            <label>Country : </label>
            <p> {Country}</p>
        </section>
        
        <section>
            <label>Circle : </label>
            <p> {Circle}</p>
        </section>

        <section>
            <label>District : </label>
            <p> {District}</p>
        </section>

        <section>
            <label>Division : </label>
            <p> {Division}</p>
        </section>


        <section>
            <label>Region : </label>
            <p> {Region}</p>
        </section>
    </div>
  )
}

export default PostOffice