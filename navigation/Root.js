import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Drawers from './Drawers';
import LogIn from '../screens/LogIn';
import MyPage from '../screens/MyPage';
import CalenderDaily from '../screens/CalenderDaily';
import CategoryDetail from '../screens/CategoryDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../shared/reducers/auth';
import { GetMemo, GetTags } from '../shared/API';
import { setMemos } from '../shared/reducers/memo';
import { setTags } from '../shared/reducers/tag';
import Loader from '../shared/components/Loader';

const Nav = createNativeStackNavigator();

const Root = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  //개발 완료되고 기본값 false로 변경하기!
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  //이미 토큰이 리덕스에 저장된 경우(직접 카카오로그인)
  useEffect(() => {
    if (authData.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [authData]);

  //직접 로그인하는 경우가 아니라면 AsyncStorage에 토큰이 있다면 로그인
  useEffect(async () => {
    const storedToken = await AsyncStorage.getItem('ChatMinderAccessToken');
    if (storedToken) {
      dispatch(setLoginState(storedToken));
      setIsLoggedIn(true);
    }
    setLoading(false);
    // await AsyncStorage.removeItem('ChatMinderAccessToken');
  }, []);

  useEffect(async () => {
    if (isLoggedIn) {
      setLoading(true);
      try {
        const getMemoRes = await GetMemo(authData.accessToken);
        dispatch(setMemos(getMemoRes.data));
        const getTagRes = await GetTags(authData.accessToken);
        dispatch(setTags(getTagRes.data));
      } catch (error) {
        console.log(`메모 가져오기 실패: ${error}`);
      }
      setLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Nav.Navigator screenOptions={{ presentation: 'modal' }}>
          {isLoggedIn ? (
            <>
              <Nav.Screen
                name="Drawers"
                component={Drawers}
                options={{ headerShown: false }}
              />
              <Nav.Screen
                name="Tabs"
                component={Tabs}
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
      )}
    </>
  );
};

export default Root;
