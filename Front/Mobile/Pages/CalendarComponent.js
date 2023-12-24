import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Calendar from 'expo-calendar';

const CalendarComponent = () => {
  const [calendarPermission, setCalendarPermission] = useState(null);

  useEffect(() => {
    (async () => {
      // Request calendar permissions
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      setCalendarPermission(status === 'granted');
    })();
  }, []);

  const handleOpenCalendar = async () => {
    if (calendarPermission) {
      // Open the default device calendar
      await Calendar.openEventInCalendar({
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
        title: 'Example Event',
        location: 'Example Location',
        notes: 'This is an example event created by Expo Calendar API.',
      });
    } else {
      console.log('Calendar permission not granted.');
    }
  };

  return (
    <View>
      <Text>Calendar Component</Text>
      <Button title="Open Calendar" onPress={handleOpenCalendar} />
    </View>
  );
};

export default CalendarComponent;
