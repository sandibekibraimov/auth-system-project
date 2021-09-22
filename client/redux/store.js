import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, middleware);

export default store;
