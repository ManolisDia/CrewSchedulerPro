import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';

const CustomPicker = ({ items, onSelect }) => {
  const [visible, setVisible] = useState(false);
  

  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <View>
      <Button title="Select Shift" onPress={() => setVisible(true)} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelect(item)}>
                <Text style={styles.itemText}>{`${item.date} at ${item.address}`}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});

export default CustomPicker;
