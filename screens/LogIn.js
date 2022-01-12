import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import { PostLogIn } from '../shared/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../shared/reducers/auth';
import Loader from '../shared/components/Loader';
import Logo from '../shared/assets/LoginLogo.svg';

const LogIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const loginAtOnce = async () => {
    setLoading(true);
    try {
      //카카오 로그인
      const kakaoRes = await login();
      console.log(`카카오 로그인 성공: ${JSON.stringify(kakaoRes)}`);
      //챗마인더 로그인
      const Sendingdata = {
        kakao_access_token: kakaoRes.accessToken,
      };
      const logInRes = await PostLogIn(Sendingdata);
      const ChatMinderAccessToken = logInRes.data.data.access;
      console.log(`챗마인더 로그인 성공: ${JSON.stringify(logInRes.data)}`);
      //Async Storage에 로그인 상태 저장
      await AsyncStorage.setItem(
        'ChatMinderAccessToken',
        ChatMinderAccessToken
      );
      dispatch(setLoginState(ChatMinderAccessToken));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Logo />
          <Button title="카카오 로그인" onPress={loginAtOnce} />
        </View>
      )}
    </>
  );
};

export default LogIn;
