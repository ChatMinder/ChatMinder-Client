import React from 'react';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';

//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './shared/reducer';

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}
