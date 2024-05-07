import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import axios from 'axios';
import { BASE_URL } from '@env';
import { useAuth } from '../auth-context';
import ShiftDetailsModal from './ShiftDetailsModal';
import ShiftModal from './ShiftModal';

import moment from 'moment';

const Dashboard = ({ navigation }) => {
    const [upcomingShifts, setUpcomingShifts] = useState([]);
    const [incompleteShifts, setIncompleteShifts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const { userInfo } = useAuth();
    const [upcomingModalVisible, setUpcomingModalVisible] = useState(false);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const upcomingData = await axios.get(`${BASE_URL}/shifts/crew/${userInfo.id}`);
                const incompleteData = await axios.get(`${BASE_URL}/shifts/incomplete`);
                const now = moment(); // Get the current moment in time
    
                const formattedUpcomingShifts = upcomingData.data
                    .map(shift => ({
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
                        crewMembers: shift.crewMembers,
                        startDateTime: moment(`${shift.date} ${shift.startTime}`, 'YYYY-MM-DD HH:mm') 
                    }))
                    .filter(shift => shift.startDateTime.isAfter(now)) 
                    .sort((a, b) => a.startDateTime.diff(b.startDateTime))
                    .slice(0, 3); 

                const formattedIncompleteShifts = incompleteData.data
                .filter(shift => !shift.crewMembers.some(crewMember => crewMember.id === userInfo.id))
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
            await axios.post(`${BASE_URL}/shifts/addCrew/${selectedShift.id}/${userInfo.id}`);
            setModalVisible(false);
            const updatedShifts = incompleteShifts.filter(shift => shift.id !== selectedShift.id);
            setIncompleteShifts(updatedShifts);
        } catch (error) {
            console.error('Error accepting shift:', error);
        }
    };

    const handleRejectShift = (shiftId) => {
        const updatedShifts = incompleteShifts.filter(shift => shift.id !== shiftId);
        setIncompleteShifts(updatedShifts);
        setSelectedShift(null); 
    };
    
    

    

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.HeaderText}>CrewScheduler Pro</Text>
                
            </View>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Text style={styles.sectionHeader}>Upcoming Shifts</Text>
                    </>
                }
                data={upcomingShifts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        setSelectedShift(item);
                        setUpcomingModalVisible(true);
                    }}>
                        <View style={styles.upcomingFLView}>
                            <Text style={[styles.cornerItem]}>{item.address}</Text>
                            <Text style={[styles.cornerItem]}>{`${item.startTime} - ${item.endTime}`}</Text>
                            <Text style={[styles.cornerItem]}>{item.date}</Text>
                            <Text style={[styles.cornerItem]}>No. of Crew: {item.required_crew_members}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListFooterComponent={
                    <>
                        <Text style={styles.sectionHeader}>Shift Offers</Text>
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
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Shift View')}>
                            <Text style={styles.buttonText}>View Shift Calendar</Text>
                        </TouchableOpacity>
                    </>
                }
            />
            <ShiftDetailsModal
                shift={selectedShift}
                visible={selectedShift !== null}
                onClose={() => setSelectedShift(null)}
                onAccept={handleAcceptShift}
                onReject={() => handleRejectShift(selectedShift.id)}
            />


            <ShiftModal
                shift={selectedShift}
                visible={upcomingModalVisible}
                closeModal={() => setUpcomingModalVisible(false)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'lightblue',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        padding: 10,
    },
    HeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    upcomingContainer: {
        padding: 5,
    },
    upcomingFLView: {
        minHeight: 70,
        width: '100%',
        marginVertical: 3,
        backgroundColor: '#e1f5fe',
        borderRadius: 10,
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    cornerItem: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    offersContainer: {
        padding: 5,
    },
    offersFLView: {
        minHeight: 80, 
        width: 300, 
        marginHorizontal: 5,
        backgroundColor: '#e1f5fe',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
    }
});

export default Dashboard;
