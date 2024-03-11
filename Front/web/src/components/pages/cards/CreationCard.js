import React from 'react'
import '../../css/CreationCard.css'


function CreationCard() {
  return (
    <div className='CCard'>
      <div className='CCard-container'>
        <div className = 'title'>
          <h1>Shift Creation</h1>
        </div>
        <div className = 'location'>
          <h2>Location</h2>
        </div>
        <div className='booking'>
          <h2>Booking</h2>
        </div>
        <div className='time'>
          <h2>Start/Finish Time</h2>
        </div>
        <div className='notes'>
          <h2>Notes</h2>
        </div>
        <div className='selector'>
          <h2>Selector</h2>
        </div>
        <div className='create'>
          <h2>Create</h2>
        </div>
      </div>
    </div>
  )
}

export default CreationCard
