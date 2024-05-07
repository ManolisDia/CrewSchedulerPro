import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [requestedWorkHours, setRequestedWorkHours] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [role, setRole] = useState('');
    const navigation = useNavigation();

    const handleSignUp = () => {
        console.log('Signing up...');
        axios.post(`${BASE_URL}/crewmembers/crew-members`, {
            username: username,
            password: password,
            name: name,
            requestedWorkHours: parseInt(requestedWorkHours, 10),
            jobPosition: jobPosition,
            role: role
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('User created:', response.data);
            // Show success alert
            Alert.alert(
                'Sign Up Successful',
                'You have successfully signed up.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                           
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Dashboard' }],
                            });
                        }
                    }
                ],
                { cancelable: false }
            );
        })
        .catch(error => {
            console.error('Error when signing up:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        });
    };

    return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Requested Number Of Hours'
        value={requestedWorkHours}
        keyboardType='numeric' // Ensures numeric input
        onChangeText={text => setRequestedWorkHours(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder='Job Position'
        value={jobPosition}
        onChangeText={setJobPosition}
      />
      <TextInput
        style={styles.input}
        placeholder='Role'
        value={role}
        onChangeText={setRole}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Go to Sign In"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default SignUp;
