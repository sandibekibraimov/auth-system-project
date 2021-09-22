import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';

const RegisterScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate('home');
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                style={styles.image}
                source={require('../assets/image/logo.png')}
              />
            </View>

            <View>
              <TextInput
                style={styles.input}
                placeholder='Full name'
                placeholderTextColor='#fff'
                onChangeText={props.handleChange('fullName')}
                value={props.values.fullName}
              />

              <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='#fff'
                keyboardType='email-address'
                onChangeText={props.handleChange('email')}
                value={props.values.email}
              />

              <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='#fff'
                secureTextEntry={true}
                onChangeText={props.handleChange('password')}
                value={props.values.password}
              />

              <TouchableOpacity
                style={styles.btnContainer}
                onPress={props.handleSubmit}
              >
                <Text style={styles.btn}>Register</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.register}>Have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                  <Text style={styles.registerBtn}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    width: 300,
    backgroundColor: '#b6bfc4',
    borderRadius: 16,
    fontSize: 16,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  btnContainer: {
    width: 300,
    backgroundColor: '#738289',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  btn: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  registerContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  register: {
    color: '#738289',
    fontSize: 16,
  },
  registerBtn: {
    color: '#738289',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
