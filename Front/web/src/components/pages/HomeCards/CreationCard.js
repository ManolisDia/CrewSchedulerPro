import React from 'react'
import '../../css/CreationCard.css'
import Multiselect from 'multiselect-react-dropdown'


function CreationCard() {
  return (
    <div className='CCard'>
      <div className='CCard-container'>
        <div className = 'title'>
          <h1>Shift Creation</h1>
        </div>
        <div className = 'location'>
          <h2>Location</h2>
          <input type='text' id='address' placeholder='Address'/>
          <input type='text' id='postcode' placeholder='Postcode'/>

        </div>
        <div className='booking'>
          <h2>Booking</h2>
          <input type='text' id='bookingco' placeholder='Booking Company'/>
          <input type='text' id='sitecontact' placeholder='Site Contact'/>
          <input type='text' id='sitecontactno' placeholder='Site Contact Number'/>
        </div>
        <div className='time'>
          <h2>Start/Finish Time</h2>
          <input type='date' id = 'date' placeholder='Date'/>
          <input type='time' id = 'start' placeholder='Start Time'/>
          <input type='time' id = 'finish' placeholder='Finish Time'/>
        </div>
        <div className='notes'>
          <h2>Notes</h2>
          <textarea id='notes' placeholder='Notes'/>
        </div>
        <div className='selector'>
          <h2>Selector</h2>
          <Multiselect
            options={[{name: 'John Doe', id: 1}, {name: 'Jane Doe', id: 2}]}
            displayValue='name'
            placeholder='Select Crew'
          />
        </div>
        <div className='create'>
          <h2>Create</h2>
        </div>
      </div>
    </div>
  )
}

export default CreationCard
