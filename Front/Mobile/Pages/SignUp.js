import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env'; // Ensure this is destructured correctly if it's exported as an object

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [requestedNumberOfHours, setRequestedNumberOfHours] = useState('');

  const handleSignUp = () => {
    console.log('Signing up...');
    axios.post(`${BASE_URL}/crew-members`, {  // Correct usage of template literals
      username: username,
      password: password,
      name: name,
      requestedNumberOfHours: parseInt(requestedNumberOfHours, 10) // Ensure this is an integer
    })
    .then(response => {
      console.log('User created:', response.data);
      // Handle success (e.g., navigate to login or dashboard)
    })
    .catch(error => {
      console.error('There was an error!', error);
      // Handle errors here if any
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
        value={requestedNumberOfHours}
        keyboardType='numeric' // Ensures numeric input
        onChangeText={text => setRequestedNumberOfHours(text)}
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
      <Button title="Sign Up" onPress={handleSignUp} />
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
