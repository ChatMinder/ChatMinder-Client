import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import HomeIcon from '../shared/assets/Home.svg';
import TagIcon from '../shared/assets/Tag.svg';
import CalendarIcon from '../shared/assets/Calendar.svg';
import TintHomeIcon from '../shared/assets/TintHome.svg';
import TintTagIcon from '../shared/assets/TintTag.svg';
import TintCalendarIcon from '../shared/assets/TintCalendar.svg';

import Calendar from '../screens/CalendarPage';
import Category from '../screens/Category';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="메인"
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'white',
          height: 56,
        },
        tabBarActiveTintColor: '#FF7F6D',
        tabBarInactiveTintColor: '#D7D7EC',
        headerTitleStyle: {
          color: '#373737',
        },
        tabBarLabelStyle: {
          fontFamily: 'NanumSquareOTF_ac',
          fontSize: 10,
          fontWeight: '400',
          marginBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="태그"
        component={Category}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? <TintTagIcon /> : <TagIcon />;
          },
        }}
      />
      <Tab.Screen
        name="메인"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <TintHomeIcon /> : <HomeIcon />;
          },
        }}
      />
      <Tab.Screen
        name="캘린더"
        component={Calendar}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? <TintCalendarIcon /> : <CalendarIcon />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Icon = styled.Image`
  width: 22px;
  height: 22px;
`;
export default Tabs;
