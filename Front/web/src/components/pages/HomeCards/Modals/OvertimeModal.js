import React from 'react';
import '../../../css/Modal.css'; // Ensure this path correctly points to your Modal CSS

function OvertimeModal({ onRequestClose, request, onAccept, onReject }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Request Details</h2>
                {/* Check for crewMember and shift object existence to avoid runtime errors */}
                <p>Name: {request.crewMember ? request.crewMember.name : 'No name available'}</p>
                <p>Shift Address: {request.shift ? request.shift.address : 'No shift address available'}</p>
                <p>Overtime Hours: {request.overtimeHours ? request.overtimeHours : '0'} hours</p>
                <p>Date: {request.shift ? request.shift.date : 'No date available'}</p>
                
                {/* Buttons for accepting, rejecting, and closing the request view */}
                <div className="modal-buttons">
                    <button onClick={() => onAccept(request)} className="modal-button accept">Accept</button>
                    <button onClick={() => onReject(request)} className="modal-button reject">Reject</button>
                    <button onClick={onRequestClose} className="modal-button close">Close</button>
                </div>
            </div>
        </div>
    );
}

export default OvertimeModal;
