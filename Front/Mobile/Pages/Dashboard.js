import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import axios from 'axios';
import { BASE_URL } from '@env'; // Ensure this is defined in your environment
import { useAuth } from '../auth-context'; // Import the authentication context to access user info

const Dashboard = ({ navigation }) => {
  const [upcomingShifts, setUpcomingShifts] = useState([]);
  const { userInfo } = useAuth(); // Assuming userInfo contains the logged in user's ID and other details

  const allShifts = [
    { id: '1', place: 'Hilton Park Lane', startFinish: '10:00 - 18:00', date: '2023-12-12', crewNo: '4' },
    { id: '2', place: 'Marriott Marquis', startFinish: '09:00 - 17:00', date: '2023-12-13', crewNo: '5' },
    { id: '3', place: 'Sheraton Grand', startFinish: '08:00 - 16:00', date: '2023-12-14', crewNo: '6' },
    { id: '4', place: 'Hyatt Regency', startFinish: '11:00 - 19:00', date: '2023-12-15', crewNo: '3' },
    { id: '5', place: 'InterContinental', startFinish: '12:00 - 20:00', date: '2023-12-16', crewNo: '7' },
    { id: '6', place: 'Ritz-Carlton', startFinish: '13:00 - 21:00', date: '2023-12-17', crewNo: '4' },
];

function handlePress() {
    console.log("Pressed");
  }


  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/shifts/crew/${userInfo.id}`);
        // Format the data to be suitable for the UI
        const formattedData = data.map(shift => ({
          id: shift.id.toString(), // Ensure id is a string for keyExtractor
          place: shift.address,
          startFinish: `${shift.startTime} - ${shift.endTime}`,
          date: shift.date,
          crewNo: shift.crewMembers.length.toString() // Assuming crewMembers is an array
        })).slice(0, 3); // Take only the first three shifts
        setUpcomingShifts(formattedData);
      } catch (error) {
        console.error('Failed to fetch shifts:', error);
      }
    };

    fetchShifts();
  }, [userInfo.id]); // Depend on userInfo.id to refetch when it changes

  function goToShiftView() {
    console.log("Go to shiftView");
    navigation.navigate('ShiftView');
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.HeaderText}>CrewScheduler Pro</Text>
      </View>

      <View style={styles.line}/>

      <View style={styles.upcomingContainer}>
        <View style={styles.upcomingTitle}>
          <Text style={styles.buttonText}>Upcoming Shifts</Text>
        </View>
      </View>

      <View style={styles.line}/>

      <View style={styles.containerUS}>
        <FlatList
          data={upcomingShifts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.upcomingFLView}>
              <TouchableOpacity onPress={goToShiftView}><Text style={[styles.topLeft, styles.cornerItem]}>{item.place}</Text></TouchableOpacity>
              <TouchableOpacity onPress={goToShiftView}><Text style={[styles.topRight, styles.cornerItem]}>{item.startFinish}</Text></TouchableOpacity>
              <TouchableOpacity onPress={goToShiftView}><Text style={[styles.bottomLeft, styles.cornerItem]}>{item.date}</Text></TouchableOpacity>
              <TouchableOpacity onPress={goToShiftView}><Text style={[styles.bottomRight, styles.cornerItem]}>No. of Crew: {item.crewNo}</Text></TouchableOpacity>
            </View>
          )}
        />
      </View>

            <View style={styles.line}/>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={goToShiftView}>
                        <Text style={styles.buttonText}>View Shift Calendar</Text>
                    </TouchableOpacity>
                </View>
            </View>
                

            <View style={styles.line}/>

            <View style={styles.offersContainer}>
                <View style={styles.offersTitle}>
                    <Text style={styles.buttonText}>Shift Offers</Text>
                </View>
            </View>

            <View style={styles.line}/>

            <View style={styles.containerOF}>
                <FlatList
                    horizontal
                    data={allShifts}
                    renderItem={({ item }) => (
                        <View style={styles.offersFLView}>
                            <Text>{item.place}</Text>
                            <Text>{item.startFinish}</Text>
                            <Text>{item.date}</Text>
                            <Text>No. of Crew: {item.crewNo}</Text>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.line}/>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.buttonText}>View All Offers</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.line}/>                

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'lightblue',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        padding: 15,
    },
    HeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 10,
    },
    upcomingContainer: {
        padding: 10,
    },
    upcomingFLView: {
        minHeight: 90, // Increased height to match offers
        width: '100%',
        marginVertical: 5,
        backgroundColor: '#e1f5fe', // Light blue background to match offers
        borderRadius: 10, // Rounded corners
        padding: 10, // Padding inside each item
        flexDirection: 'column', // Changed to column for better spacing
        justifyContent: 'space-around', // Space elements evenly
    },
    cornerItem: {
        fontSize: 16, // Increased font size
        fontWeight: 'bold', // Make font bold
    },
    offersContainer: {
        padding: 10,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'lightblue',
        width: '95%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerOF: {
        width: '95%',
        height: 120, // Increased height for better visibility
        alignItems: 'center',
        alignContent: 'center',
        paddingVertical: 10, // Added padding
    },
    offersFLView: {
        flex: 1,
        height: 90, // Adjusted height
        width: '100%',
        marginHorizontal: 5,
        backgroundColor: '#e1f5fe', // Light blue background
        borderRadius: 10, // Rounded corners
        padding: 10, // Padding inside each item
        flexDirection: 'column', // Change direction to column for better spacing
        justifyContent: 'space-around', // Space elements evenly
    }
});





export default Dashboard;
