import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Calendar from '../screens/CalendarPage';
import Category from '../screens/Category';
import Drawers from './Drawers';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="메인"
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        tabBarStyle: {
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
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Icon source={require('../shared/assets/TintTag.png')} />
            ) : (
              <Icon source={require('../shared/assets/Tag.png')} />
            );
          },
        }}
      />
      <Tab.Screen
        name="메인"
        component={Drawers}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Icon source={require('../shared/assets/TintHome.png')} />
            ) : (
              <Icon source={require('../shared/assets/Home.png')} />
            );
          },
        }}
      />
      <Tab.Screen
        name="캘린더"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Icon source={require('../shared/assets/TintCalendar.png')} />
            ) : (
              <Icon source={require('../shared/assets/Calendar.png')} />
            );
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
