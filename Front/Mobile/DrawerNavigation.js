import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from './auth-context';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import Notifications from './Pages/Notifications';
import ShiftView from './Pages/ShiftView';
import OvertimeHoliday from './Pages/OvertimeHoliday';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Shift View" component={ShiftView} />
      <Drawer.Screen name="Overtime and Holiday" component={OvertimeHoliday} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyDrawer;