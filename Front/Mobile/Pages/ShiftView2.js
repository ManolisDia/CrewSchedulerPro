import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from '@env';
import { useAuth } from '../auth-context';

const ShiftView = () => {
  const [shifts, setShifts] = useState([]);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchShifts = async () => {
      if (!userInfo) {
        console.error('User info not available');
        return; 
      }
      console.log('Fetching shifts for user:', userInfo);
      try {
        const response = await axios.get(`${BASE_URL}/shifts`);
        const crewMemberShifts = response.data.filter(
          (shift) => shift.crewMembers.some((member) => member.id === userInfo.id)
        );
        const formattedShifts = crewMemberShifts.map((shift) => ({
          key: shift.id.toString(),
          start: `${shift.date} ${shift.startTime}`, // Ensure this is 'YYYY-MM-DD HH:mm:ss'
          duration: calculateDuration(shift.startTime, shift.endTime),
          note: shift.notes,
      }));
        console.log('Formatted shifts:', formattedShifts);
        setShifts(formattedShifts);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };

    fetchShifts();
  }, [userInfo]);

  const calculateDuration = (startTime, endTime) => {
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");
    const duration = moment.duration(end.diff(start));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
};

  return (
    <View style={styles.container}>
      <WeeklyCalendar
        events={shifts}
        style={{ height: 400 }}
        renderEvent={(event) => (
          <View style={{ backgroundColor: 'red', padding: 5 }}>
            <Text style={{ color: 'white' }}>{event.note}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
  },
});

export default ShiftView;