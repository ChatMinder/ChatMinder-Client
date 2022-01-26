import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Drawers from './Drawers';
import Starting from '../screens/Starting';
import CalenderDaily from '../screens/CalenderDaily';
import CategoryDetail from '../screens/CategoryDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../shared/reducers/auth';
import { CheckTokenValid, GetMemo, GetTags } from '../shared/API';
import { setMemos } from '../shared/reducers/memo';
import { setTags } from '../shared/reducers/tag';
import Loader from '../shared/components/Loader';
import { Alert } from 'react-native';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';

const Nav = createNativeStackNavigator();

const Root = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  //이미 토큰이 리덕스에 저장된 경우(직접 로그인)
  useEffect(() => {
    if (authData.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [authData]);

  //AsyncStorage에 토큰이 저장되어 있는 경우(자동 로그인)
  useEffect(async () => {
    const storedToken = await AsyncStorage.getItem('ChatMinderRefreshToken');
    if (storedToken) {
      try {
        const data = {
          refresh_token: storedToken,
        };
        const getTokenRes = await CheckTokenValid(data);
        dispatch(setLoginState(getTokenRes.data.access_token));
        await AsyncStorage.setItem(
          'ChatMinderRefreshToken',
          getTokenRes.data.refresh_token
        );
        setIsLoggedIn(true);
      } catch (error) {
        if (error == 'Error: Network Error') {
          Alert.alert(
            '알림',
            `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
            [
              {
                text: '네!',
                style: 'cancel',
              },
            ]
          );
        }
      }
    }
    setLoading(false);
    // await AsyncStorage.removeItem('ChatMinderRefreshToken');
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
        if (error == 'Error: Network Error') {
          Alert.alert(
            '알림',
            `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
            [
              {
                text: '네!',
                style: 'cancel',
              },
            ]
          );
        }
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
            <>
              <Nav.Screen name="Starting" component={Starting} />
              <Nav.Screen name="LogIn" component={LogIn} />
              <Nav.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Nav.Navigator>
      )}
    </>
  );
};

export default Root;
