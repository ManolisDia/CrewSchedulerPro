import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/HolidayCard.css';
import OvertimeModal from './Modals/OvertimeModal';

function HolidayCard() {
    const [holidayRequests, setHolidayRequests] = useState([]);
    const [overtimeRequests, setOvertimeRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Function to fetch holiday requests
    const fetchHolidayRequests = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/holidays`);
            setHolidayRequests(response.data);
        } catch (error) {
            console.error('Failed to fetch holiday requests:', error);
        }
    };

    // Function to fetch overtime requests
    const fetchOvertimeRequests = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/overtime`);
            setOvertimeRequests(response.data);
        } catch (error) {
            console.error('Failed to fetch overtime requests:', error);
        }
    };

    useEffect(() => {
        fetchHolidayRequests();
        fetchOvertimeRequests();
    }, []);

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    const handleAccept = async (request) => {
        console.log("Accepting request:", request);
        try {
            // Append the overtime hours as a query parameter in the request URL
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/shifts/addOvertime/${request.shift.id}?overtimeHours=${request.overtimeHours}`);
            console.log('Overtime added to shift:', response.data);
            fetchOvertimeRequests();  // Refresh the overtime requests after successful update
        } catch (error) {
            console.error('Error adding overtime:', error);
            alert('Failed to add overtime: ' + (error.response ? error.response.data.message : error.message));
        }
    };
    

    const handleReject = (request) => {
        console.log("Rejecting request:", request);
        // Implement reject logic
    };

    return (
        <div className='HCard'>
          <h1>Holiday and Overtime Requests</h1>
          <div className='requestList'>
            <h2>Holiday Requests</h2>
            {holidayRequests.length > 0 ? (
              holidayRequests.map(request => (
                <div key={request.id} className='requestItem' onClick={() => handleRequestClick(request)}>
                  <p>Name: {request.name}</p>
                  <p>Type: {request.type}</p>
                  <p>Date: {request.date}</p>
                </div>
              ))
            ) : (
              <p>No holiday requests found.</p>
            )}
            <h2>Overtime Requests</h2>
            {overtimeRequests.length > 0 ? (
              overtimeRequests.map(request => (
                <div key={request.id} className='requestItem' onClick={() => handleRequestClick(request)}>
                  <p>Name: {request.crewMember.name}</p>
                  <p>Shift: {request.shift.address}</p>
                  <p>Overtime Hours: {request.overtimeHours}</p>
                  <p>Date: {request.shift.date}</p>
                </div>
              ))
            ) : (
              <p>No overtime requests found.</p>
            )}
          </div>
          {selectedRequest && (
            <OvertimeModal
              request={selectedRequest}
              onRequestClose={handleCloseModal}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          )}
        </div>
      );
    }
    
    export default HolidayCard;
