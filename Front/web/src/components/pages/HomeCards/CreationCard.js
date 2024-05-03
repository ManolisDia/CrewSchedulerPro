import React, { useState, useEffect } from 'react';
import '../../css/CreationCard.css';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';


// Ensure you have this environment variable set in your .env file
// and that it's prefixed with REACT_APP_ as required by Create React App
// Example: REACT_APP_BASE_URL=http://localhost:8080/api

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
  const [crewMembers, setCrewMembers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      alert("Please enter a date.");
      return;
    }
    // Log to check if the function is called
    console.log("Attempting to create shift...");
    console.log("Date value before formatting:", date);
    console.log("Type of date before formatting:", typeof date); // Make sure 'date' is the variable you want to check

  

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
      crewMembers: crewMembers
    };
    console.log("Shift Data:", shiftData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/shifts`, shiftData);
      console.log('Shift created:', response.data);
      // Reset form fields after successful submission
      setAddress('');
      setPostcode('');
      setBookingCompany('');
      setSiteContact('');
      setSiteContactNumber('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setNotes('');
      setCrewMembers([]);
    } catch (error) {
      console.error('Error creating shift:', error);
      alert('Failed to create shift: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const fetchCrewMembers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/crewmembers`);
      setCrewMembers(response.data);
    } catch (error) {
      console.error('Error fetching crew members:', error);
    }
  };

  useEffect(() => {
    fetchCrewMembers();
  }, []);

  return (
    <div className="CCard">
      <div className="CCard-container">
        <div className="title">
          <h1>Shift Creation</h1>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="selector">
            <h2>Selector</h2>
            <Multiselect
              options={crewMembers}
              displayValue="name"
              placeholder="Select Crew"
              onSelect={(selectedList) => setCrewMembers(selectedList)}
              onRemove={(selectedList) => setCrewMembers(selectedList)}
            />
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
