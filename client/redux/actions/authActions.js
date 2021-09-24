import axios from 'axios';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

const BASE_URL = 'http://192.168.1.25:3000';

// registering new user action
export const registerUser = (newUser) => {
  const { fullName, email, password } = newUser;

  return async (dispatch) => {
    const result = await fetch(`${BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });
    const resultData = await result.json();

    console.log(resultData);

    resultData.success
      ? dispatch({ type: REGISTER_USER_SUCCESS, payload: resultData })
      : dispatch({ type: REGISTER_USER_FAIL, payload: resultData });

    return resultData;
  };
};

export const loginUser = (user) => {
  const { email, password } = user;

  return async (dispatch) => {
    const result = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const resultData = await result.json();

    resultData.success
      ? dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: resultData,
        })
      : dispatch({
          type: LOGIN_USER_FAIL,
          payload: resultData,
        });

    return resultData;
  };
};
