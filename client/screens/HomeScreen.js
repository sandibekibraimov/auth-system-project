import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const HomeScreen = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const loadProfile = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      props.navigation.navigate('login');
    }
    const decoded = jwtDecode(token);
    setFullName(decoded.fullName);
    setEmail(decoded.email);
    console.log(decoded);
  };

  const logout = (props) => {
    AsyncStorage.removeItem('token')
      .then(() => {
        props.navigation.replace('login');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome {fullName ? fullName : ''}</Text>
        <Text style={styles.text}>your email is: {email ? email : ''}</Text>
      </View>
      <View>
        <Button title='Logout' onPress={() => logout(props)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});

export default HomeScreen;
