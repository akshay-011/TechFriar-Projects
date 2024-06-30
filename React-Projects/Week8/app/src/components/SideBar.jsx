import React from 'react'

const SideBar = ({ filterHandler, inputs }) => {
  return (
    <div className='sidebar user-sidebar' >
        <ul>
            <li className='sidebar-options' >
            <h1>Search</h1>
            <input 
                name='search'
                type='text'
                onChange={filterHandler}
                value={inputs.search}
                className='search'
            />
            </li>
            <li className='sidebar-options' >
                <h1>Name</h1>
                <section>
                    <div className='options' >
                        <input 
                            className='radio-btn'
                            type='radio'
                            name='sort'
                            value={"A-Z"}
                            onChange={filterHandler}
                        />
                        <label>A-Z</label>
                    </div>
                    <div className='options' >
                        <input 
                            className='radio-btn'
                            type='radio'
                            name='sort'
                            value={"Z-A"}
                            onChange={filterHandler}
                        />
                        <label>Z-A</label>
                    </div>
                </section>
            </li>

            <li className='sidebar-options' >
                <h1>Price</h1>
                <section>
                    <div className='options' >
                        <input 
                            className='radio-btn'
                            type='radio'
                            name='sort'
                            value={"low-to-high"}
                            onChange={filterHandler}
                        />
                        <label>Low to High</label>
                    </div>
                    <div className='options' >
                        <input 
                            className='radio-btn'
                            type='radio'
                            name='sort'
                            value={"high-to-low"}
                            onChange={filterHandler}
                        />
                        <label>High to Low</label>
                    </div>
                </section>
            </li>
        </ul>
    </div>
  )
}

export default SideBar