import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import { PostLogIn } from '../shared/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setLoginState, tokenIssued } from '../shared/reducers/auth';

const LogIn = () => {
  let kakaoAccessToken;
  const dispatch = useDispatch();

  const loginAtOnce = async () => {
    //카카오 로그인
    try {
      const token = await login();
      console.log(`카카오 로그인 성공: ${JSON.stringify(token)}`);
      kakaoAccessToken = token.accessToken;
      try {
        let data = {
          kakao_access_token: kakaoAccessToken,
        };
        const logInRes = await PostLogIn(data);
        const ChatMinderAccessToken = logInRes.data.data.access;
        console.log(`챗마인더 로그인 성공: ${JSON.stringify(logInRes.data)}`);
        //Async Storage에 로그인 상태 저장
        try {
          await AsyncStorage.setItem(
            'ChatMinderAccessToken',
            ChatMinderAccessToken
          );
          dispatch(setLoginState(ChatMinderAccessToken));
        } catch (error) {
          console.log(`AsyncStorage 저장 실패 : ${error}`);
        }
      } catch (error) {
        console.log(`챗마인더 로그인 실패: ${error}`);
      }
    } catch (error) {
      console.log(`카카오 로그인 실패: ${error}`);
    }
  };

  return (
    <View>
      <Button title="카카오 로그인" onPress={loginAtOnce} />
    </View>
  );
};

export default LogIn;
