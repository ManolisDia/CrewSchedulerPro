import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/HolidayCard.css';
import OvertimeModal from './Modals/OvertimeModal';

function HolidayCard() {
    const [holidayRequests, setHolidayRequests] = useState([]);
    const [overtimeRequests, setOvertimeRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
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

        fetchHolidayRequests();
        fetchOvertimeRequests();
    }, []);

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    const handleAccept = (request) => {
        console.log("Accepting request:", request);
        // Implement accept logic
    };

    const handleReject = (request) => {
        console.log("Rejecting request:", request);
        // Implement reject logic
    };

    return (
        <div className='HCard'>
            <h1>Holiday and Overtime Requests</h1>
            <h2>Holiday Requests</h2>
            {holidayRequests.length > 0 ? (
                holidayRequests.map(request => (
                    <div key={request.id} onClick={() => handleRequestClick(request)}>
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
                    <div key={request.id} onClick={() => handleRequestClick(request)}>
                        <p>Name: {request.crewMember?.name}</p>
                        <p>Shift: {request.shift?.address}</p>
                        <p>Overtime Hours: {request.overtimeHours}</p>
                        <p>Date: {request.shift?.date}</p>
                    </div>
                ))
            ) : (
                <p>No overtime requests found.</p>
            )}
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