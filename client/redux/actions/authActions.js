import axios from 'axios';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

const BASE_URL = 'http://192.168.1.25:3000';

// registering new user action
export const registerUser = (newUser) => async (dispatch) => {
  // const { fullName, email, password } = newUser;
  try {
    const registeredUser = await axios.post(
      `${BASE_URL}/api/users/register`,
      newUser
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: registeredUser.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error,
    });
  }
};

export const loginUser = (newUser) => async (dispatch) => {
  const { email, password } = newUser;
  try {
    const loggedUser = await axios.post(
      'localhost:3000/api/users/register',
      newUser
    );

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: registerUser,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error,
    });
  }
};
