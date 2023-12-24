import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';


const ShiftView = () => {
  // Customize the marked dates as needed

  const leftArrowIcon = require('../assets/previous.png');
  const rightArrowIcon = require('../assets/next.png');

  const sampleEvents = [
    { key: '1', 'start': '2023-12-23 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
    { key: '2', 'start': '2023-12-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
    { key: '3', 'start': '2023-12-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
    { key: '4', 'start': '2023-12-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
    { key: '5', 'start': '2023-12-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
    { key: '6', 'start': '2023-12-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
    { key: '7', 'start': '2024-01-02 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
    { key: '8', 'start': '2024-01-07 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
    { key: '9', 'start': '2024-01-13 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
    { key: '10', 'start': '2024-03-12 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
  ];



  return (
    
      <View>
        <View style={styles.container}>
          <WeeklyCalendar 
          events={sampleEvents} 
          style={{ height: 400 }}
          selected={'2023-12-17'}
          startWeekday={1}
          renderEvent={event => (
            <View 
              
              style={{ 
                backgroundColor: 'red', padding: 5 
              }}>
              <Text 
              onPress={() => {
                console.log('Pressed event: ', event);
              }} 
              style={{ color: 'white' }}>{event.note}</Text>
            </View>
          )}
          />
        </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500
  },
});

export default ShiftView;