import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './auth-context';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import MyDrawer from './DrawerNavigation';
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function RootComponent() {
  const { isAuthenticated } = useAuth();
  console.log('Is authenticated:', isAuthenticated);
  return isAuthenticated ? <MyDrawer /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootComponent />
      </NavigationContainer>
    </AuthProvider>
  );
}
