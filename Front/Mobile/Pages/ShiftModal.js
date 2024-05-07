import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const ShiftModal = ({ shift, visible, closeModal }) => {
  if (!shift) {
    return null;
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Shift Details</Text>
          <Text>Address: {shift.address || 'No address provided'}</Text>
          <Text>Postcode: {shift.postcode || 'No postcode'}</Text>
          <Text>Booking Company: {shift.bookingCompany || 'No booking company'}</Text>
          <Text>Site Contact: {shift.siteContact || 'No site contact'}</Text>
          <Text>Site Contact Number: {shift.siteContactNumber || 'No contact number'}</Text>
          <Text>Date: {shift.date || 'No date'}</Text>
          <Text>Start Time: {shift.startTime || 'No start time'}</Text>
          <Text>End Time: {shift.endTime || 'No end time'}</Text>
          <Text>Notes: {shift.notes || 'No notes'}</Text>
          <Text>Overtime Hours: {shift.overtimeHours || 'No overtime hours'}</Text>
          <Text>Required Crew Members: {shift.required_crew_members || 'No required crew members'}</Text>
          
          <Text style={styles.crewMembersTitle}>Crew Members:</Text>
          {shift.crewMembers && shift.crewMembers.length > 0 ? (
            shift.crewMembers.map((crewMember, index) => (
              <Text key={index} style={styles.crewMemberName}>
                {crewMember.name || 'Unnamed crew member'}
              </Text>
            ))
          ) : (
            <Text>No crew members assigned.</Text>
          )}
          
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  crewMembersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  crewMemberName: {
    fontSize: 14,
    marginBottom: 4,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ShiftModal;
