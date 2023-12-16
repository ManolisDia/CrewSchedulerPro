import React from 'react';
import { useCallback } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import {ExpandableCalendar, AgendaList, Agenda, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import {getTheme, themeColor, lightThemeColor} from '../assets/theme';


const ShiftView = () => {
  // Customize the marked dates as needed

  const leftArrowIcon = require('../assets/previous.png');
  const rightArrowIcon = require('../assets/next.png');
  
  const customItems = [
    {
      title: '2023-12-12',
      data: [
        { id: '1', place: 'Hilton Park Lane', startFinish: '10:00 - 18:00', crewNo: '4', dotColor: 'blue', key: '1' },
        // Add more items for the date as needed
      ],
    },
    {
      title: '2023-12-13',
      data: [
        { id: '2', place: 'Marriott Marquis', startFinish: '09:00 - 17:00', crewNo: '5', dotColor: 'red', key: '2' },
        // Add more items for the date as needed
      ],
    },
    // Add entries for other dates
  ];
  
  
  const renderItem = useCallback(({ item }) => {
    // Customize the rendering of each item based on your requirements
    return (
      <View>
        <Text>{item.place}</Text>
        <Text>{item.startFinish}</Text>
        {/* Add more details as needed */}
      </View>
    );
  }, []);
  


  return (
    <View>
        <Agenda style={{height: 500}}
          sections={customItems}
          renderItem={renderItem}
          // scrollToNextEvent
          // sectionStyle={styles.section}
          // dayFormat={'yyyy-MM-d'}
        />
      <Text>Shift View</Text>
    </View>
  );
};

export default ShiftView;