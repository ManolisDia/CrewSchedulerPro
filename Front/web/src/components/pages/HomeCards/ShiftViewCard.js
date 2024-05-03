import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import '../../css/ShiftViewCard.css';

const ShiftViewCard = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/shifts');
        const formattedShifts = response.data.map((shift) => ({
          title: shift.bookingCompany, // Customize the title based on your shift data
          start: new Date(shift.date + 'T' + shift.startTime),
          end: new Date(shift.date + 'T' + shift.endTime),
          // Add any other properties you want to include in the event object
        }));
        setShifts(formattedShifts);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };

    fetchShifts();
  }, []);

  return (
    <div className="SVCard">
      <h1>Shift View</h1>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={shifts}
      />
    </div>
  );
};

export default ShiftViewCard;