import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomPicker from './CustomPicker'; // Adjust the path as necessary
import axios from 'axios';
import { BASE_URL } from '@env';
import { useAuth } from '../auth-context'; // Import the authentication context

const OvertimeHoliday = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState();
  const [overtimeHours, setOvertimeHours] = useState('');
  const [holidayStart, setHolidayStart] = useState(new Date());
  const [holidayEnd, setHolidayEnd] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const { userInfo } = useAuth();
  const [selectedShiftLabel, setSelectedShiftLabel] = useState('');

  useEffect(() => {
    if (userInfo && userInfo.id) {
      axios.get(`${BASE_URL}/shifts/crew/${userInfo.id}`)
        .then(response => {
          setShifts(response.data.slice(0, 5));
          if (response.data.length > 0) {
            setSelectedShift(response.data[0].id);
          }
        })
        .catch(error => console.error('Error fetching shifts', error));
    }
  }, [userInfo]);

  const handleHolidaySubmit = () => {
    if (userInfo && userInfo.id) {
      axios.post(`${BASE_URL}/holidayRequests`, {
        crewMemberId: userInfo.id,
        dateStart: holidayStart.toISOString().split('T')[0],
        dateEnd: holidayEnd.toISOString().split('T')[0]
      })
      .then(response => alert('Holiday request submitted successfully'))
      .catch(error => alert('Error submitting holiday request'));
    }
  };

  const handleOvertimeSubmit = () => {
    if (userInfo && userInfo.id) {
      axios.post(`${BASE_URL}/overtime`, {
        shiftId: selectedShift,
        crewMemberId: userInfo.id,
        overtimeHours: parseInt(overtimeHours, 10)
      })
      .then(response => {
        alert('Overtime request submitted successfully');
        setShifts(prevShifts => prevShifts.filter(shift => shift.id !== selectedShift));
        setSelectedShift(null);
        setSelectedShiftLabel('');
      })
      .catch(error => alert('Error submitting overtime request'));
    }
  };


  
  
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Holiday Request</Text>
      <View>
        <Button onPress={() => setShowStartPicker(true)} title="Choose Start Date" />
        {showStartPicker && (
          <DateTimePicker
            value={holidayStart}
            mode="date"
            display="default"
            onChange={(event, date) => { 
              setShowStartPicker(Platform.OS === 'ios'); 
              setHolidayStart(date || holidayStart); 
            }}
          />
        )}
        <Text style={styles.dateText}>
          Start Date: {holidayStart.toLocaleDateString()}
        </Text>
      </View>

      <View>
        <Button onPress={() => setShowEndPicker(true)} title="Choose End Date" />
        {showEndPicker && (
          <DateTimePicker
            value={holidayEnd}
            mode="date"
            display="default"
            onChange={(event, date) => { 
              setShowEndPicker(Platform.OS === 'ios'); 
              setHolidayEnd(date || holidayEnd); 
            }}
          />
        )}
        {/* Display the selected end date */}
        <Text style={styles.dateText}>
          End Date: {holidayEnd.toLocaleDateString()}
        </Text>
      </View>

      <Button title="Submit Holiday Request" onPress={handleHolidaySubmit} />


      <Text style={styles.header}>Overtime Request</Text>
      
      <CustomPicker
        items={shifts}
        onSelect={(item) => {
          setSelectedShift(item.id);
          setSelectedShiftLabel(`${item.date} at ${item.address}`); // Update this line as per your shift object properties
        }}
      />

      <View style={{ padding: 10, marginTop: 10 }}>
        <Text style={styles.selectedShiftText}>{selectedShiftLabel}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Overtime Hours"
        keyboardType="numeric"
        value={overtimeHours}
        onChangeText={setOvertimeHours}
      />
      <Button title="Submit Overtime Request" onPress={handleOvertimeSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black', 
    paddingRight: 30, 
    backgroundColor: 'white' 
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black', 
    borderRadius: 8,
    color: 'black', 
    paddingRight: 30, 
    backgroundColor: 'white' 
  },
});


export default OvertimeHoliday;
