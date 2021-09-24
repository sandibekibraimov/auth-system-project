import React from 'react';

import store from './redux/store';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
