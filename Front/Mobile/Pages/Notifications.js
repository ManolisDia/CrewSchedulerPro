import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
  {
    id: '1',
    title: 'New Message',
    description: 'You have received a new message from Alice.',
    time: '10 mins ago',
  },
  {
    id: '2',
    title: 'Update Available',
    description: 'A new version of the app is available for download.',
    time: '1 hour ago',
  },
  // ... more notifications
];

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.title}>{item.title}</Text>
    <Text>{item.description}</Text>
    <Text style={styles.time}>{item.time}</Text>
  </View>
);

const Notifications = () => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <NotificationItem item={item} />}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Notifications;
