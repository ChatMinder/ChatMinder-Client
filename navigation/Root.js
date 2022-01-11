import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Drawers from './Drawers';
import LogIn from '../screens/LogIn';
import MyPage from '../screens/MyPage';
import CalenderDaily from '../screens/CalenderDaily';
import CategoryDetail from '../screens/CategoryDetail';
import { useSelector } from 'react-redux';

const Nav = createNativeStackNavigator();

const Root = () => {
  //로그인 성공하면 REDUX에 토큰 저장하고 로그인 상태 불러와서 setIsLoggedIn 업데이트!
  const authData = useSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(authData.isLoggedIn);
  }, [authData]);
  return (
    <Nav.Navigator screenOptions={{ presentation: 'modal' }}>
      {isLoggedIn ? (
        <>
          <Nav.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Nav.Screen
            name="Drawers"
            component={Drawers}
            options={{ headerShown: false }}
          />
          <Nav.Screen name="MyPage" component={MyPage} />
          <Nav.Screen
            name="CalenderDaily"
            component={CalenderDaily}
            options={{ headerBackVisible: false }}
          />
          <Nav.Screen
            name="CategoryDetail"
            component={CategoryDetail}
            options={{ headerBackVisible: false }}
          />
        </>
      ) : (
        <Nav.Screen name="LogIn" component={LogIn} />
      )}
    </Nav.Navigator>
  );
};

export default Root;
