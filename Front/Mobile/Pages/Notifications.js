import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useWebSocket from '../Hooks/useWebSocket';

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.title}>{item.title}</Text>
    <Text>{item.description}</Text>
    <Text style={styles.time}>{item.time}</Text>
  </View>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { messages } = useWebSocket('http://192.168.0.25:8080/ws');

  useEffect(() => {
    const newNotifications = messages.map((message, index) => ({
      id: index.toString(),
      title: 'New Shift',
      description: message,
      time: new Date().toLocaleString(),
    }));
    setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
  }, [messages]);

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
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