import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styled, { css } from 'styled-components/native';
import Home from '../screens/Home';
import LogIn from '../screens/LogIn';
import gatherImg from '../screens/DrawerNavScreens/gatherImg';
import gatherLink from '../screens/DrawerNavScreens/gatherLink';
import gatherText from '../screens/DrawerNavScreens/gatherText';
import detailText from '../screens/DrawerNavScreens/detailText';
import TextB from '../shared/components/TextR';
import palette from '../shared/palette';

const Drawer = createDrawerNavigator();

const MenuBox = styled.TouchableOpacity`
  background-color: ${palette.lightPurple};
  border-radius: 8px;
  margin: 0 5% 5% 5%;
  padding: 2% 0%;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: 5%;
    `};
`;

const StyledText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Drawers = () => {
  const CustomDrawerContent = (props) => (
    <SafeAreaView>
      <ScrollView>
        <MenuBox marginTop onPress={() => props.navigation.navigate('Home')}>
          <TextB>
            <StyledText>Home</StyledText>
          </TextB>
        </MenuBox>
        <MenuBox onPress={() => props.navigation.navigate('gatherImg')}>
          <TextB>
            <StyledText>이미지 모아보기</StyledText>
          </TextB>
        </MenuBox>
        <MenuBox onPress={() => props.navigation.navigate('gatherLink')}>
          <TextB>
            <StyledText>링크 모아보기</StyledText>
          </TextB>
        </MenuBox>
        <MenuBox onPress={() => props.navigation.navigate('gatherText')}>
          <TextB>
            <StyledText>텍스트 모아보기</StyledText>
          </TextB>
        </MenuBox>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="order"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="gatherImg" component={gatherImg} />
      <Drawer.Screen name="gatherLink" component={gatherLink} />
      <Drawer.Screen name="gatherText" component={gatherText} />
      <Drawer.Screen name="detailText" component={detailText} />
    </Drawer.Navigator>
  );
};

export default Drawers;
