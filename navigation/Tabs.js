import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: 'black',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
        },
      }}
    >
      <Tab.Screen
        name="카테고리"
        component={Category}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={
                  focused ? `ios-file-tray-full` : `ios-file-tray-full-outline`
                }
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="메인"
        component={Drawers}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? `md-home` : `md-home-outline`}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="캘린더"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? `ios-calendar` : `ios-calendar-outline`}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
