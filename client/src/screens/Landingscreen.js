import React from 'react'
import { Link } from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing'>
      <div className='col-md-12'>
        <h2 style={{color:'white', fontSize:'130px'}}>Our Rooms</h2>
        <h1 style={{color:'white', textAlign:'center'}}>"Stay in style - book in ease"</h1>
        <Link to="/home">
            <button className='btn landingbtn' >Get Started</button>
        </Link>
      </div>
    </div>
  )
}

export default Landingscreen

