import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import gatherImg from '../screens/DrawerNavScreens/gatherImg';
import gatherLink from '../screens/DrawerNavScreens/gatherLink';
import gatherText from '../screens/DrawerNavScreens/gatherText';

const Drawer = createDrawerNavigator();

const Drawers = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="이미지 모아보기" component={gatherImg} />
      <Drawer.Screen name="링크 모아보기" component={gatherLink} />
      <Drawer.Screen name="텍스트 모아보기" component={gatherText} />
    </Drawer.Navigator>
  );
};

export default Drawers;
