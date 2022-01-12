import React, { useEffect, useState } from 'react';
import { Text, View, Button, PixelRatio } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import { PostLogIn } from '../shared/API';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../shared/reducers/auth';
import Loader from '../shared/components/Loader';
import Logo from '../shared/assets/LoginLogo.svg';
import LogoText from '../shared/assets/LoginText.svg';
import KakaoSymbol from '../shared/assets/KakaoSymbol.svg';

import palette from '../shared/palette';

const LogIn = ({ navigation }) => {
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

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper>
          <LogoContainer>
            <Logo style={{ margin: 12 }} />
            <LogoText />
          </LogoContainer>
          <LoginBtnContainer>
            <KakaoLogIn onPress={loginAtOnce}>
              <SymbolContainer>
                <KakaoSymbol />
              </SymbolContainer>
              <Label>카카오로 시작하기</Label>
            </KakaoLogIn>
          </LoginBtnContainer>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background: #f7f7fa;
  justify-content: space-evenly;
  align-items: center;
`;
const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 150px;
  padding-bottom: 200px;
`;
const LoginBtnContainer = styled.View`
  width: 100%;
  height: 54px;
  align-items: center;
`;

const KakaoLogIn = styled.TouchableOpacity`
  background: #fee500;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  width: 90%;
  height: 100%;
`;
const SymbolContainer = styled.View`
  position: absolute;
  left: 15px;
`;
const Label = styled.Text`
  position: relative;
  left: 15px;
  font-size: 17px;
`;

export default LogIn;
