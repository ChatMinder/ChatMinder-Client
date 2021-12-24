import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import gatherImg from '../screens/DrawerNavScreens/gatherImg';
import gatherLink from '../screens/DrawerNavScreens/gatherLink';
import gatherText from '../screens/DrawerNavScreens/gatherText';
import gatherMarked from '../screens/DrawerNavScreens/gatherMarked';
import gatherDeleted from '../screens/DrawerNavScreens/gatherDeleted';

const Drawer = createDrawerNavigator();

const Drawers = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="이미지 모아보기" component={gatherImg} />
      <Drawer.Screen name="링크 모아보기" component={gatherLink} />
      <Drawer.Screen name="텍스트 모아보기" component={gatherText} />
      <Drawer.Screen name="북마크한 메모" component={gatherMarked} />
      <Drawer.Screen name="삭제한 메모" component={gatherDeleted} />
    </Drawer.Navigator>
  );
};

export default Drawers;
