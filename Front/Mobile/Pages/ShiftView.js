import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useAuth } from '../auth-context';
import ShiftModal from './ShiftModal'; // Import the ShiftModal component

const CustomCalendar = () => {
  const [shifts, setShifts] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [selectedShift, setSelectedShift] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchShifts = async () => {
      if (!userInfo) {
        console.error('User info not available');
        return;
      }
      console.log('Fetching shifts for user:', userInfo);
      try {
        const response = await axios.get(`${BASE_URL}/shifts/crew/${userInfo.id}`);
        const crewMemberShifts = response.data.map(shift => {
          const start = moment(shift.date + ' ' + shift.startTime, 'YYYY-MM-DD HH:mm');
          const end = moment(shift.date + ' ' + shift.endTime, 'YYYY-MM-DD HH:mm');
          return {
            ...shift,
            start: start.isValid() ? start.toDate() : undefined,
            end: end.isValid() ? end.toDate() : undefined
          };
        });
        setShifts(crewMemberShifts);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };
  
    fetchShifts();
  }, [userInfo, currentWeek]);

  const renderWeek = () => {
    const startOfWeek = currentWeek.clone().startOf('week');
    const endOfWeek = currentWeek.clone().endOf('week');
    const days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(
        <View key={day.format('YYYY-MM-DD')} style={styles.day}>
          <Text style={styles.dayLabel}>{day.format('ddd, MMM D')}</Text>
          {renderShifts(day)}
        </View>
      );
      day = day.clone().add(1, 'day');
    }

    return days;
  };

  const renderShifts = (day) => {
    const dayShifts = shifts.filter(shift => moment(shift.start).isSame(day, 'day'));
  
    return dayShifts.map((shift, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          console.log('Shift pressed:', shift); // Add this line for debugging
          setSelectedShift(shift);
        }}
        style={styles.shiftContainer} // Add a style for the TouchableOpacity
      >
        <View style={styles.shift}>
          <Text style={styles.shiftDetails}>Location: {shift.address}</Text>
          <Text style={styles.shiftDetails}>Start Time: {moment(shift.start).format('HH:mm')}</Text>
          <Text style={styles.shiftDetails}>End Time: {moment(shift.end).format('HH:mm')}</Text>
        </View>
      </TouchableOpacity>
    ));
  };
  

  const handlePrevWeek = () => {
    setCurrentWeek(currentWeek.clone().subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.clone().add(1, 'week'));
  };

  const closeModal = () => {
    setSelectedShift(null);
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevWeek}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{currentWeek.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={handleNextWeek}>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>{renderWeek()}</View>
      <ShiftModal shift={selectedShift} closeModal={closeModal} /> 
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7', // Light grey background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#4a90e2', // Blue background for the header
    borderRadius: 6,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // White text for better visibility
  },
  arrow: {
    fontSize: 24,
    color: '#ffffff', // White arrows
  },
  calendar: {
    flex: 1,
  },
  day: {
    flexDirection: 'row', // Align day and shifts side by side
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff', // White background for each day
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dddddd', // Light grey border for separation
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333', // Dark grey for text
    marginRight: 10, // Add margin to separate date from shifts
  },
  shift: {
    backgroundColor: '#e1f5fe', // Light blue for shift details
    borderRadius: 8,
    padding: 8,
    marginLeft: 5, // Space between multiple shifts
    minWidth: 200, // Minimum width for each shift box
    maxWidth: 400, 
    margin: 5, // Give some space around each shift box
  },
  shiftDetails: {
    fontSize: 16,
    color: '#333333', // Consistent text color
  },
});

export default CustomCalendar;
