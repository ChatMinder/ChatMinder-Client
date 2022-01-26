import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import palette from '../shared/palette';
import { CMLogIn } from '../shared/API';
import { setLoginState } from '../shared/reducers/auth';

const LogIn = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle: { backgroundColor: palette.logInGray },
      title: '챗마인더 로그인',
    });
  }, []);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ID: '',
      PW: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const sendingData = {
        login_id: data.ID,
        password: data.PW,
      };
      const logInRes = await CMLogIn(sendingData);
      const ChatMinderTokens = logInRes.data;
      await AsyncStorage.setItem(
        'ChatMinderRefreshToken',
        ChatMinderTokens.refresh_token
      );
      dispatch(setLoginState(ChatMinderTokens.access_token));
    } catch (error) {
      if (error.response) {
        Alert.alert(
          '알림',
          `로그인에 실패했습니다.\n아이디와 비밀번호를 확인해 주세요.`,
          [
            {
              text: '네!',
              style: 'cancel',
            },
          ]
        );
      }
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

  return (
    <Wrapper>
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Container>
            <InputLabel>아이디</InputLabel>
            <Input
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          </Container>
        )}
        name="ID"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Container>
            <InputLabel>비밀번호</InputLabel>
            <Input
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          </Container>
        )}
        name="PW"
      />
      <SubmitBtnContainer onPress={handleSubmit(onSubmit)}>
        <SubmitBtnText>로그인</SubmitBtnText>
      </SubmitBtnContainer>
      <SignUpBtn
        hitSlop={{ top: 12, bottom: 12, left: 24, right: 24 }}
        onPress={() => navigation.navigate('SignUp')}
      >
        <SignUpText>아직 아이디가 없다면? 회원가입하기</SignUpText>
      </SignUpBtn>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background: ${palette.logInGray};
`;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SpinnerWrapper = styled.View`
  position: absolute;
  left: ${SCREEN_WIDTH * 0.5 - 18}px;
  bottom: ${SCREEN_HEIGHT * 0.5 - 18}px;
  z-index: 10;
`;

const Container = styled.View`
  margin: 8px 16px 8px 16px;
  width: 90%;
`;
const InputLabel = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  font-size: 16px;
`;
const Input = styled.TextInput`
  margin: 4px 0 4px 0;
  padding: 0 10px 0 10px;
  background: ${palette.white};
  border: 1px solid #d8d9df;
  align-self: center;
  width: 100%;
  height: 50px;
`;

const SubmitBtnContainer = styled.TouchableOpacity`
  width: 90%;
  height: 55px;
  border-radius: 27.5px;
  background: ${palette.main};
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: 10px;
`;
const SubmitBtnText = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  color: ${palette.white};
`;

const SignUpBtn = styled.TouchableOpacity`
  margin-top: 24px;
  align-self: center;
`;
const SignUpText = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  font-size: 14px;
  color: #565c6b;
  text-decoration: underline;
`;

export default LogIn;
