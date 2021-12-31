import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Drawers from './Drawers';
import LogIn from '../screens/LogIn';
import MyPage from '../screens/MyPage';
import CalenderDaily from '../screens/CalenderDaily';

const Nav = createNativeStackNavigator();

const Root = () => {
  //로그인 성공하면 REDUX에 토큰 저장하고 로그인 상태 불러와서 setIsLoggedIn 업데이트!
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Nav.Navigator
      screenOptions={{ presentation: 'modal', headerShown: false }}
    >
      {isLoggedIn ? (
        <>
          <Nav.Screen name="Tabs" component={Tabs} />
          <Nav.Screen name="Drawers" component={Drawers} />
          <Nav.Screen name="MyPage" component={MyPage} />
          <Nav.Screen name="CalenderDaily" component={CalenderDaily} />
        </>
      ) : (
        <Nav.Screen name="LogIn" component={LogIn} />
      )}
    </Nav.Navigator>
  );
};

export default Root;
