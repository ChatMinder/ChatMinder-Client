import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styled, { css } from 'styled-components/native';
import gatherImg from '../screens/DrawerNavScreens/gatherImg';
import gatherLink from '../screens/DrawerNavScreens/gatherLink';
import gatherText from '../screens/DrawerNavScreens/gatherText';
import detailText from '../screens/DrawerNavScreens/detailText';
import TextB from '../shared/components/TextR';
import palette from '../shared/palette';
import Tabs from './Tabs';

const Drawer = createDrawerNavigator();

const MenuBox = styled.TouchableOpacity`
  background-color: ${palette.lightPurple};
  align-self: center;
  width: 78%;
  border-radius: 8px;
  margin-bottom: 7%;
  padding: 6% 0%;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: 30%;
    `};
`;

const StyledText = styled.Text`
  width: 80%;
  color: white;

  font-size: 16px;
  font-family: 'NanumSquareOTF_ac Bold';
`;

const Drawers = ({ navigation }) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const CustomDrawerContent = (props) => (
    <SafeAreaView>
      <ScrollView>
        <MenuBox
          marginTop
          onPress={() => props.navigation.navigate('gatherImg')}
        >
          <StyledText>이미지 모아보기</StyledText>
        </MenuBox>
        <MenuBox onPress={() => props.navigation.navigate('gatherLink')}>
          <StyledText>링크 모아보기</StyledText>
        </MenuBox>
        <MenuBox onPress={() => props.navigation.navigate('gatherText')}>
          <StyledText>텍스트 모아보기</StyledText>
        </MenuBox>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{
        drawerStyle: {
          width: SCREEN_WIDTH * 0.47,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="gatherImg"
        component={gatherImg}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="gatherLink"
        component={gatherLink}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="gatherText"
        component={gatherText}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="detailText"
        component={detailText}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
};

export default Drawers;
