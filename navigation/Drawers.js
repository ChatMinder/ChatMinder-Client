import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styled, { css } from 'styled-components/native';
import Home from '../screens/Home';
import LogIn from '../screens/LogIn';
import gatherImg from '../screens/DrawerNavScreens/gatherImg';
import gatherLink from '../screens/DrawerNavScreens/gatherLink';
import gatherText from '../screens/DrawerNavScreens/gatherText';
import gatherMarked from '../screens/DrawerNavScreens/gatherMarked';
import gatherDeleted from '../screens/DrawerNavScreens/gatherDeleted';
import detailText from '../screens/DrawerNavScreens/detailText';

const Drawer = createDrawerNavigator();

const MeueItem = styled.Text`
  margin-left: 5%;
  margin-bottom: 5%;
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: 5%;
    `}
`;

const Drawers = () => {
  const CustomDrawerContent = (props) => (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <MeueItem marginTop>Home</MeueItem>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('gatherImg')}
        >
          <MeueItem>이미지 모아보기</MeueItem>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('gatherLink')}
        >
          <MeueItem>링크 모아보기</MeueItem>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('gatherText')}
        >
          <MeueItem>텍스트 모아보기</MeueItem>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('gatherMarked')}
        >
          <MeueItem>북마크한 메모</MeueItem>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <Drawer.Navigator
      initialRouteName="LogIn"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="LogIn" component={LogIn} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="gatherImg" component={gatherImg} />
      <Drawer.Screen name="gatherLink" component={gatherLink} />
      <Drawer.Screen name="gatherText" component={gatherText} />
      <Drawer.Screen name="gatherMarked" component={gatherMarked} />
      <Drawer.Screen name="gatherDeleted" component={gatherDeleted} />
      <Drawer.Screen name="detailText" component={detailText} />
    </Drawer.Navigator>
  );
};

export default Drawers;
