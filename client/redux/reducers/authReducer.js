import { CREATE_USER } from '../actions/authActions';

const initialState = [];

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_USER:
      return state;
    default:
      return state;
  }
};

export default authReducer;
