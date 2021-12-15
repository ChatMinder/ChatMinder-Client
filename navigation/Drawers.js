import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Category1 from '../screens/categories/Category1';
import Category2 from '../screens/categories/Category2';
import Category3 from '../screens/categories/Category3';

const Drawer = createDrawerNavigator();

const Drawers = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Category1" component={Category1} />
      <Drawer.Screen name="Category2" component={Category2} />
      <Drawer.Screen name="Category3" component={Category3} />
    </Drawer.Navigator>
  );
};

export default Drawers;
