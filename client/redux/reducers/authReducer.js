import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../actions/authActions';

const initialState = {
  users: [],
  errors: [],
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  console.log('reducer', payload);
  switch (type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        users: payload,
      };

    case REGISTER_USER_FAIL:
      return {
        ...state,
        errors: payload,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        users: payload,
      };

    case LOGIN_USER_FAIL:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
