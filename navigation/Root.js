import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Drawers from './Drawers';
// import Stack from './Stack';
import CalenderDaily from '../screens/CalenderDaily';
import CategoryDetail from '../screens/CategoryDetail';

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: 'modal' }}>
    <Nav.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
    <Nav.Screen
      name="Drawers"
      component={Drawers}
      options={{ headerShown: false }}
    />
    {/* <Nav.Screen name="Stack" component={Stack} /> */}
    <Nav.Screen
      name="CalenderDaily"
      component={CalenderDaily}
      options={{ headerBackVisible: false }}
    />
    <Nav.Screen
      name="CategoryDetail"
      component={CategoryDetail}
      options={{ headerBackVisible: false }}
    />
  </Nav.Navigator>
);

export default Root;
