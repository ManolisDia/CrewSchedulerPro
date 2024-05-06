import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import Modal from 'react-modal';
import '../../css/ShiftViewCard.css';  // Ensure CSS is imported

Modal.setAppElement('#root');  // Appropriate accessibility setting for modals

const ShiftViewCard = () => {
  const [shifts, setShifts] = useState([]);  // State for storing shift data
  const [modalIsOpen, setModalIsOpen] = useState(false);  // State for modal visibility
  const [selectedShift, setSelectedShift] = useState(null);  // State for storing selected shift

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/shifts');
        const formattedShifts = response.data.map((shift) => ({
          id: shift.id,
          title: shift.bookingCompany,
          start: new Date(shift.date + 'T' + shift.startTime),
          end: new Date(shift.date + 'T' + shift.endTime),
          extendedProps: {
            ...shift  // Spread all shift details for easy access later
          }
        }));
        setShifts(formattedShifts);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };

    fetchShifts();
  }, []);

  const openModal = (clickInfo) => {
    setSelectedShift(clickInfo.event.extendedProps);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedShift(null);
  };

  return (
    <div className="SVCard">
      <h1>Shift View</h1>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={shifts}
        eventClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="ModalOverlay"
        className="ModalContent"
        contentLabel="Shift Details"
      >
        <h2 className="ModalHeader">Shift Details</h2>
        {selectedShift ? (
          <>
            <p className="ModalText">Address: {selectedShift.address}</p>
            <p className="ModalText">Postcode: {selectedShift.postcode}</p>
            <p className="ModalText">Booking Company: {selectedShift.bookingCompany}</p>
            <p className="ModalText">Site Contact: {selectedShift.siteContact}</p>
            <p className="ModalText">Contact Number: {selectedShift.siteContactNumber}</p>
            <p className="ModalText">Date: {selectedShift.date}</p>
            <p className="ModalText">Start Time: {selectedShift.startTime}</p>
            <p className="ModalText">End Time: {selectedShift.endTime}</p>
            <p className="ModalText">Notes: {selectedShift.notes}</p>
            <p className="ModalText">Overtime Hours: {selectedShift.overtimeHours}</p>
            <p className="ModalText">Required Crew Members: {selectedShift.requiredCrewMembers}</p>
            <p className="ModalText">Crew Members: {selectedShift.crewMembers.map(member => member.name).join(', ')}</p>
            <button className="ModalButton" onClick={closeModal}>Close</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default ShiftViewCard;
