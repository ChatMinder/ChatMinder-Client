import React from 'react';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';

//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './shared/reducers/index';
import { StatusBar } from 'react-native';

const store = createStore(reducers);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}
