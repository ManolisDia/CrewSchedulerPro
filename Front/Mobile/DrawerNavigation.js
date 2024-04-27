import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import Notifications from './Pages/Notifications';
import ShiftView from './Pages/ShiftView';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Shift View" component={ShiftView} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
