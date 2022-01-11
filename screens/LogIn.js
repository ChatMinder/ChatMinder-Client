import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import { PostLogIn } from '../shared/API';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../shared/reducers/auth';

const LogIn = () => {
  const dispatch = useDispatch();

  const [kakaoAccessToken, setKakaoAccessToken] = useState('');

  const loginAtOnce = async () => {
    //카카오 로그인
    try {
      const token = await login();
      console.log(`카카오 로그인 성공: ${JSON.stringify(token)}`);
      setKakaoAccessToken(token.accessToken);
    } catch (error) {
      console.log(`카카오 로그인 실패: ${error}`);
    }
    //
    try {
      let data = {
        kakao_access_token: kakaoAccessToken,
      };
      const logInRes = await PostLogIn(data);
      console.log(`챗마인더 로그인 성공: ${JSON.stringify(logInRes.data)}`);
      dispatch(setLoginState(logInRes.data.data.access));
    } catch (error) {
      console.log(`챗마인더 로그인 실패: ${error}`);
    }
  };

  return (
    <View>
      <Button title="카카오 로그인" onPress={loginAtOnce} />
    </View>
  );
};

export default LogIn;
