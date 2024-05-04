import React from 'react';
// Make sure any other imports are correct
import '../../../css/Modal.css';


function OvertimeModal({ onRequestClose, request, onAccept, onReject }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Request Details</h2>
                <p>Name: {request.crewMember?.name || request.name}</p>
                <p>Type: {request.type || `Overtime for ${request.shift.address}`}</p>
                <p>Date: {request.date || request.shift.date}</p>
                {request.overtimeHours && <p>Overtime Hours: {request.overtimeHours}</p>}
                <button onClick={() => onAccept(request)}>Accept</button>
                <button onClick={() => onReject(request)}>Reject</button>
                <button onClick={onRequestClose}>Close</button>
            </div>
        </div>
    );
}

export default OvertimeModal;
