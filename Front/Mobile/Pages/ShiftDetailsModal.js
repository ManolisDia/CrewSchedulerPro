import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ShiftDetailsModal = ({ visible, onClose, shift, onAccept }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Shift Details</Text>
                    {shift && (
                        <>
                            <Text>Address: {shift.place}</Text>
                            <Text>Date: {shift.date}</Text>
                            <Text>Time: {shift.startFinish}</Text>
                            <Text>Required Crew: {shift.requiredCrewNo}</Text>
                            <Button title="Accept Shift" onPress={() => onAccept(shift)} />
                            <Button title="Reject" onPress={onClose} />
                        </>
                    )}
                    <Button title="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

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
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ShiftDetailsModal;
