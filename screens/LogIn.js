import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useDispatch } from 'react-redux';
import { login } from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

import { PostLogIn } from '../shared/API';
import { setLoginState } from '../shared/reducers/auth';
import Loader from '../shared/components/Loader';
import Logo from '../shared/assets/LoginLogo.svg';
import LogoText from '../shared/assets/LoginText.svg';
import KakaoSymbol from '../shared/assets/KakaoSymbol.svg';
import { Alert, StatusBar } from 'react-native';
import palette from '../shared/palette';

const LogIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const loginAtOnce = async () => {
    setLoading(true);
    try {
      //카카오 로그인
      const kakaoRes = await login();
      //챗마인더 로그인
      const Sendingdata = {
        kakao_access_token: kakaoRes.accessToken,
        timestamp: moment().unix(),
      };
      const logInRes = await PostLogIn(Sendingdata);
      const ChatMinderTokens = logInRes.data;
      //Async Storage에 리프레시 토큰 저장
      await AsyncStorage.setItem(
        'ChatMinderRefreshToken',
        ChatMinderTokens.refresh_token
      );
      dispatch(setLoginState(ChatMinderTokens.access_token));
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
          <StatusBar
            backgroundColor={palette.logInGray}
            barStyle="dark-content"
          />
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
  background: ${palette.logInGray};
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
