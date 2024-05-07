import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profilePic} 
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Bio: Crewman | Elite </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Contact Information</Text>
        <Text>Email: johndoe@example.com</Text>
        <Text>Phone: +123456789</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>About</Text>
        <Text>Stuff about what a crewman can do or something</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    fontStyle: 'italic',
    marginVertical: 10,
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
