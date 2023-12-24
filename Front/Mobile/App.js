
import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import Notifications from './Pages/Notifications';
import ShiftView from './Pages/ShiftView'
import CalendarComponent from './Pages/CalendarComponent';


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
      name="Dashboard" 
      component={Dashboard}
      options={({ navigation }) => ({
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Notifications')}
            title="Info"
            color="#fff"
          />
        ),
      })}
      />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Calendar Component" component={CalendarComponent} />
      <Drawer.Screen name="Shift View" component={ShiftView} />
    </Drawer.Navigator>
  );
}


// The main App component
export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
