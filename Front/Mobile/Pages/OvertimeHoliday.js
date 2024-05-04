import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useAuth } from '../auth-context'; // Import the authentication context to access user info

const OvertimeHoliday = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState();
  const [overtimeHours, setOvertimeHours] = useState('');
  const [holidayStart, setHolidayStart] = useState(new Date());
  const [holidayEnd, setHolidayEnd] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const { userInfo } = useAuth(); // Assuming userInfo contains the logged in user's ID and other details

  useEffect(() => {
    // Use userInfo.id directly in the API call
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
        console.log("Posting this data:", {
            shiftId: selectedShift,
            crewMemberId: userInfo.id,
            overtimeHours: parseInt(overtimeHours, 10)
          });
          
      axios.post(`${BASE_URL}/overtime`, {
        shiftId: selectedShift,
        crewMemberId: userInfo.id,
        overtimeHours: parseInt(overtimeHours, 10)
      })
      .then(response => alert('Overtime request submitted successfully'))
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
            onChange={(event, date) => { setShowStartPicker(Platform.OS === 'ios'); setHolidayStart(date || holidayStart); }}
          />
        )}
      </View>
      <View>
        <Button onPress={() => setShowEndPicker(true)} title="Choose End Date" />
        {showEndPicker && (
          <DateTimePicker
            value={holidayEnd}
            mode="date"
            display="default"
            onChange={(event, date) => { setShowEndPicker(Platform.OS === 'ios'); setHolidayEnd(date || holidayEnd); }}
          />
        )}
      </View>
      <Button title="Submit Holiday Request" onPress={handleHolidaySubmit} />

      <Text style={styles.header}>Overtime Request</Text>
      <Picker
        selectedValue={selectedShift}
        onValueChange={(itemValue, itemIndex) => setSelectedShift(itemValue)}
        style={styles.picker}>
        {shifts.map(shift => (
          <Picker.Item key={shift.id} label={`Shift on ${shift.date}`} value={shift.id} />
        ))}
      </Picker>
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
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  }
});

export default OvertimeHoliday;
