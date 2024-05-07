import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/HolidayCard.css';
import OvertimeModal from './Modals/OvertimeModal';

function HolidayCard() {
    const [holidayRequests, setHolidayRequests] = useState([]);
    const [overtimeRequests, setOvertimeRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchHolidayRequests();
        fetchOvertimeRequests();
    }, []);

    const fetchHolidayRequests = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/holidays`);
            setHolidayRequests(response.data);
        } catch (error) {
            console.error('Failed to fetch holiday requests:', error);
        }
    };

    const fetchOvertimeRequests = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/overtime`);
            setOvertimeRequests(response.data);
        } catch (error) {
            console.error('Failed to fetch overtime requests:', error);
        }
    };

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    const handleAccept = async (request) => {
        console.log("Accepting request:", request);
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/shifts/addOvertime/${request.shift.id}?overtimeHours=${request.overtimeHours}`);
            console.log('Overtime added to shift:', response.data);
            setOvertimeRequests(prevRequests => prevRequests.filter(r => r.id !== request.id));
        } catch (error) {
            console.error('Error adding overtime:', error);
            alert('Failed to add overtime: ' + (error.response ? error.response.data.message : error.message));
        }
    };
    const handleReject = async (request) => {
        console.log("Rejecting request:", request);
        try {
            
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/overtime/crew/${request.crewMember.id}/shift/${request.shift.id}`);
            setOvertimeRequests(prevRequests => prevRequests.filter(r => r.id !== request.id));
        } catch (error) {
            console.error('Error rejecting overtime:', error);
            alert('Failed to reject overtime: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className='HCard'>
          <h1>Holiday and Overtime Requests</h1>
          <div className='requestList'>
            <h2>Holiday Requests</h2>
            {holidayRequests.map(request => (
              <div key={request.id} className='requestItem' onClick={() => handleRequestClick(request)}>
                <p>Name: {request.name}</p>
                <p>Type: {request.type}</p>
                <p>Date: {request.date}</p>
              </div>
            ))}
            <h2>Overtime Requests</h2>
            {overtimeRequests.map(request => (
              <div key={request.id} className='requestItem' onClick={() => handleRequestClick(request)}>
                <p>Name: {request.crewMember.name}</p>
                <p>Shift: {request.shift.address}</p>
                <p>Overtime Hours: {request.overtimeHours}</p>
                <p>Date: {request.shift.date}</p>
              </div>
            ))}
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
