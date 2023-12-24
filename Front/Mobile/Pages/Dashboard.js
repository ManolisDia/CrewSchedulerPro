import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";

function handlePress() {
    console.log("Pressed");
}



const allShifts = [
    { id: '1', place: 'Hilton Park Lane', startFinish: '10:00 - 18:00', date: '2023-12-12', crewNo: '4' },
    { id: '2', place: 'Marriott Marquis', startFinish: '09:00 - 17:00', date: '2023-12-13', crewNo: '5' },
    { id: '3', place: 'Sheraton Grand', startFinish: '08:00 - 16:00', date: '2023-12-14', crewNo: '6' },
    { id: '4', place: 'Hyatt Regency', startFinish: '11:00 - 19:00', date: '2023-12-15', crewNo: '3' },
    { id: '5', place: 'InterContinental', startFinish: '12:00 - 20:00', date: '2023-12-16', crewNo: '7' },
    { id: '6', place: 'Ritz-Carlton', startFinish: '13:00 - 21:00', date: '2023-12-17', crewNo: '4' },
];

const upcomingShifts = [];
for (let i = 0; i < 3; i++) {
    upcomingShifts.push(allShifts[i]);
}




const Dashboard = ({navigation}) => {

    function goToShiftView() {
        console.log("Go to shiftView")
        navigation.navigate('CalendarComponent');
        
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.header}>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.buttonText}>Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
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
                    initialNumToRender={3}
                    renderItem={({ item }) => (
                        <View style={styles.upcomingFLView}>
                            <TouchableOpacity onPress={handlePress}><Text style={[styles.topLeft, styles.cornerItem]}>{item.place}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={handlePress}><Text style={[styles.topRight, styles.cornerItem]}>{item.startFinish}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={handlePress}><Text style={[styles.bottomLeft, styles.cornerItem]}>{item.date}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={handlePress}><Text style={[styles.bottomRight, styles.cornerItem]}>No. of Crew: {item.crewNo}</Text></TouchableOpacity>
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

        </SafeAreaView>
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
    
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
    },

    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width1: '100%',
        marginVertical: 10,
    },

    upcomingContainer: {

        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },

    subTitle: {
        width: '50%',
        backgroundColor: 'lightblue',
        height: 35, 
    },

    upcomingFLView: {
        flex: 1,
        height: 60,
        width: '95%',
        marginVertical: 5,
    },

    cornerItem: {
        position: 'absolute',
    },

    topLeft: {
        top: 0,
        left: 0,
      },
    topRight: {
        top: 0,
        right: 0,
      },
    bottomLeft: {
        bottom: 0,
        left: 0,
      },
    bottomRight: {
        bottom: 0,
        right: 0,
      },

    offersContainer: {

        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        height: 90,
        alignItems: 'center',
        alignContent: 'center',
    },

    offersFLView: {
        flex: 1,
        height: 60,
        width: '95%',
        marginHorizontal: 10,
    }
    }
    
    
);



export default Dashboard;
