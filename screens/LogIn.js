import React, { useState } from 'react';
import axios from 'axios';
import { Text, View, Button } from 'react-native';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  getAccessToken,
} from '@react-native-seoul/kakao-login';

function LogIn() {
  const [kakaoResponse, setKakaoResponse] =
    useState('아직 응답 받지 못하였습니다.');
  const [serverResponse, setServerResponse] =
    useState('아직 응답 받지 못하였습니다.');
  const [kakaoAccessToken, setKakaoAccessToken] =
    useState('아직 응답 받지 못하였습니다.');
  const [serverAccessToken, setServerAccessToken] =
    useState('아직 응답 받지 못하였습니다.');

  const signInWithKakao = async () => {
    try {
      const token = await login();
      setKakaoResponse(JSON.stringify(token));
      console.log(kakaoResponse);
      setKakaoAccessToken(token.accessToken);
      console.log(kakaoAccessToken);
    } catch (e) {
      console.log('error' + e);
    }
  };

  const sendAccesToken = () => {
    // const url = "http://localhost:8000/auth/kakao";
    const url = 'https://chatminder.cf/auth/kakao';
    console.log(kakaoAccessToken);
    axios
      .post(url, {
        kakao_access_token: kakaoAccessToken,
      })
      .then((res) => {
        console.log(res);
        const resdata = JSON.stringify(res.data);
        setServerResponse(resdata);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View>
      <Button title="Kakao Login" onPress={signInWithKakao} />
      <Button title="Send Access Token" onPress={sendAccesToken} />
      <Text />
      <Text>Kakao Server response : {kakaoResponse}</Text>
      <Text />
      <Text>ChatMinder Server response : {serverResponse}</Text>
    </View>
  );
}

export default LogIn;
