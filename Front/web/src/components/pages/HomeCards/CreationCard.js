import React, { useState, useEffect } from 'react';
import '../../css/CreationCard.css';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';



function CreationCard() {
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [siteContact, setSiteContact] = useState('');
  const [siteContactNumber, setSiteContactNumber] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [required_crew_members, set_required_crew_members] = useState('');  // State to handle required crew members

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any required field is empty
    if (!address || !postcode || !bookingCompany || !siteContact || !siteContactNumber || !date || !startTime || !endTime || !required_crew_members) {
      let missingFields = [];
  
      if (!address) missingFields.push("Address");
      if (!postcode) missingFields.push("Postcode");
      if (!bookingCompany) missingFields.push("Booking Company");
      if (!siteContact) missingFields.push("Site Contact");
      if (!siteContactNumber) missingFields.push("Site Contact Number");
      if (!date) missingFields.push("Date");
      if (!startTime) missingFields.push("Start Time");
      if (!endTime) missingFields.push("End Time");
      if (!required_crew_members) missingFields.push("Required Crew Members");
  
      alert(`The following fields are not filled out: ${missingFields.join(", ")}. Please complete the form before submitting!`);
      return;
    }
  
    const shiftData = {
      address: address,
      postcode: postcode,
      bookingCompany: bookingCompany,
      siteContact: siteContact,
      siteContactNumber: siteContactNumber,
      date: date,
      startTime: startTime,
      endTime: endTime,
      notes: notes,
      required_crew_members: Number(required_crew_members)  // Convert to number before sending to the backend
    };

    console.log("Shift Data:", shiftData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/shifts`, shiftData);
      console.log('Shift created:', response.data);
      setAddress('');
      setPostcode('');
      setBookingCompany('');
      setSiteContact('');
      setSiteContactNumber('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setNotes('');
      set_required_crew_members('');
    } catch (error) {
      console.error('Error creating shift:', error);
      alert('Failed to create shift: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="CCard">
      <div className="CCard-container">
        <div className="title">
          <h1>Shift Creation</h1>
        </div>
        <form onSubmit={handleSubmit} className="creation-form">
          <div className="location">
            <h2>Location</h2>
            <input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" id="postcode" placeholder="Postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
          </div>
          <div className="booking">
            <h2>Booking</h2>
            <input type="text" id="bookingco" placeholder="Booking Company" value={bookingCompany} onChange={(e) => setBookingCompany(e.target.value)} />
            <input type="text" id="sitecontact" placeholder="Site Contact" value={siteContact} onChange={(e) => setSiteContact(e.target.value)} />
            <input type="text" id="sitecontactno" placeholder="Site Contact Number" value={siteContactNumber} onChange={(e) => setSiteContactNumber(e.target.value)} />
          </div>
          <div className="time">
            <h2>Start/Finish Time</h2>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" id="start" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <input type="time" id="finish" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div className="notes">
            <h2>Notes</h2>
            <textarea id="notes" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="required-crew">
            <h2>Required Crew</h2>
            <input type="number" id="required_crew_members" placeholder="Required Crew Members" value={required_crew_members} onChange={(e) => set_required_crew_members(e.target.value)} />
          </div>
          <div className="create">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreationCard;
