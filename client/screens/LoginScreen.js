import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthActions from '../redux/actions/authActions';

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          dispatch(AuthActions.loginUser(values))
            .then((result) => {
              if (result.success) {
                try {
                  AsyncStorage.setItem('token', result.token);
                  navigation.navigate('home');
                } catch (error) {
                  console.log(error);
                }
              } else {
                Alert.alert(result.message);
              }
            })
            .catch((error) => console.log(error));
        }}
        validationSchema={formSchema}
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
                placeholder='Email'
                placeholderTextColor='#fff'
                keyboardType='email-address'
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}
              />
              <Text style={styles.error}>
                {props.touched.email && props.errors.email}
              </Text>

              <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='#fff'
                secureTextEntry={true}
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')}
              />
              <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text>

              <TouchableOpacity
                style={styles.btnContainer}
                onPress={props.handleSubmit}
              >
                <Text style={styles.btn}>Login</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.register}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('register')}
                >
                  <Text style={styles.registerBtn}>Register</Text>
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
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default LoginScreen;
