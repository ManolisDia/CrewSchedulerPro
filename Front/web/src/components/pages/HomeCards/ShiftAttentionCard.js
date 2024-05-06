import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/ShiftAttentionCard.css';

function ShiftAttentionCard() {
  const [incompleteShifts, setIncompleteShifts] = useState([]);

  useEffect(() => {
    const fetchIncompleteShifts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/shifts/incomplete`);
        setIncompleteShifts(response.data);
      } catch (error) {
        console.error('Error fetching incomplete shifts:', error);
      }
    };

    fetchIncompleteShifts();
  }, []);

  return (
    <div className="SACard">
      <h1>Shift Attention Card</h1>
      <div className="shiftList">
        {incompleteShifts.length > 0 ? (
          <ul className="shiftItems">
            {incompleteShifts.map(shift => (
              <li key={shift.id} className="shiftItem">
                <div className="shiftDetails">
                  <p>Address: {shift.address}</p>
                  <p>Date: {shift.date}</p>
                  <p>Start Time: {shift.startTime}</p>
                  <p>End Time: {shift.endTime}</p>
                  {/* Add more details as needed */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No incomplete shifts</p>
        )}
      </div>
    </div>
  );
}

export default ShiftAttentionCard;
