import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Dimensions, ScrollView } from 'react-native';

const ShiftDetailsModal = ({ visible, onClose, shift, onAccept, onReject }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.modalText}>Shift Details</Text>
                        {shift && (
                            <>
                                <Text style={styles.detailText}>Address: {shift.place}</Text>
                                <Text style={styles.detailText}>Date: {shift.date}</Text>
                                <Text style={styles.detailText}>Time: {shift.startFinish}</Text>
                                <Text style={styles.detailText}>Required Crew: {shift.requiredCrewNo}</Text>
                                <Button title="Accept Shift" onPress={() => onAccept(shift)} />
                                <Button title="Reject" onPress={() => onReject(shift)} />
                            </>
                        )}
                        <Button title="Close" onPress={onClose} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const screenWidth = Dimensions.get('window').width; // Get the width of the screen

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        width: screenWidth - 40, // Set width relative to the screen width
        maxHeight: '80%', // Ensure modal does not exceed 80% of the screen height
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    scrollView: {
        width: '100%',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    detailText: {
        marginBottom: 10,  
        fontSize: 16,
    }
});

export default ShiftDetailsModal;
