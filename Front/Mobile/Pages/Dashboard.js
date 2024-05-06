import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import axios from 'axios';
import { BASE_URL } from '@env';  // Ensure this is defined in your environment
import { useAuth } from '../auth-context';  // Import the authentication context to access user info
import ShiftDetailsModal from './ShiftDetailsModal';  // Make sure this path is correct
import ShiftModal from './ShiftModal';
import ShiftView from './ShiftView';    


const Dashboard = ({ navigation }) => {
    const [upcomingShifts, setUpcomingShifts] = useState([]);
    const [incompleteShifts, setIncompleteShifts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const { userInfo } = useAuth();  // Assuming userInfo contains the logged in user's ID and other details
    const [upcomingModalVisible, setUpcomingModalVisible] = useState(false);


    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const upcomingData = await axios.get(`${BASE_URL}/shifts/crew/${userInfo.id}`);
                const incompleteData = await axios.get(`${BASE_URL}/shifts/incomplete`);

                
                console.log('upcomingData.data:', upcomingData.data);

                const formattedUpcomingShifts = upcomingData.data.map(shift => ({
                    id: shift.id.toString(),
                    address: shift.address,
                    postcode: shift.postcode,
                    bookingCompany: shift.bookingCompany,
                    siteContact: shift.siteContact,
                    siteContactNumber: shift.siteContactNumber,
                    date: shift.date,
                    startTime: shift.startTime,
                    endTime: shift.endTime,
                    notes: shift.notes,
                    overtimeHours: shift.overtimeHours,
                    required_crew_members: shift.required_crew_members,
                    crewMembers: shift.crewMembers
                  })).slice(0, 3);

                console.log('formattedUpcomingShifts:', formattedUpcomingShifts);

                const formattedIncompleteShifts = incompleteData.data
                .filter(shift => 
                  // Check if the current user's id is not in the crewMembers array
                  !shift.crewMembers.some(crewMember => crewMember.id === userInfo.id)
                )
                .map(shift => ({
                  id: shift.id.toString(),
                  place: shift.address,
                  startFinish: `${shift.startTime} - ${shift.endTime}`,
                  date: shift.date,
                  requiredCrewNo: shift.required_crew_members.toString()
                }));
              
                setUpcomingShifts(formattedUpcomingShifts);
                setIncompleteShifts(formattedIncompleteShifts);
            } catch (error) {
                console.error('Failed to fetch shifts:', error);
            }
        };

        fetchShifts();
    }, [userInfo.id]);

    const handleAcceptShift = async () => {
        if (!selectedShift) return;
        try {
          console.log('Crew member ID:', userInfo.id, 'Shift ID:', selectedShift.id);
            await axios.post(`${BASE_URL}/shifts/addCrew/${selectedShift.id}/${userInfo.id}`);
            setModalVisible(false);
            // Optionally refresh the list or update state to reflect the change
            const updatedShifts = incompleteShifts.filter(shift => shift.id !== selectedShift.id);
            setIncompleteShifts(updatedShifts);
        } catch (error) {
            console.error('Error accepting shift:', error);
        }
    };

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
                <FlatList
                    data={upcomingShifts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            setSelectedShift(item);
                            setUpcomingModalVisible(true);
                        }}>
                            <View style={styles.upcomingFLView}>
                                <Text style={[styles.cornerItem]}>{item.place}</Text>
                                <Text style={[styles.cornerItem]}>{item.startFinish}</Text>
                                <Text style={[styles.cornerItem]}>{item.date}</Text>
                                <Text style={[styles.cornerItem]}>No. of Crew: {item.crewNo}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.line}/>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Shift View')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>View Shift Calendar</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.line}/>

            <View style={styles.offersContainer}>
                <View style={styles.offersTitle}>
                    <Text style={styles.buttonText}>Shift Offers</Text>
                </View>
                <FlatList
                    horizontal
                    data={incompleteShifts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            setSelectedShift(item);
                            setModalVisible(true);
                        }}>
                            <View style={styles.offersFLView}>
                                <Text>{item.place}</Text>
                                <Text>{item.startFinish}</Text>
                                <Text>{item.date}</Text>
                                <Text>No. of Crew: {item.requiredCrewNo}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.line}/>

            <ShiftDetailsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                shift={selectedShift}
                onAccept={handleAcceptShift}
            />

            <ShiftModal
                shift={selectedShift}
                visible={upcomingModalVisible}
                closeModal={() => setUpcomingModalVisible(false)}
            />
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
