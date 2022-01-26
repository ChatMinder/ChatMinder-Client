import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import styled from 'styled-components/native';
import palette from '../shared/palette';
import { CheckDuplicateID, CMSignUp } from '../shared/API';
import { checkValidID, checkValidPW } from '../shared/RegExp';

const SignUp = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle: { backgroundColor: palette.logInGray },
      title: '챗마인더 가입하기',
    });
  }, []);

  const [isUniqueID, setIsUniqueID] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ID: '',
      PW: '',
      nickname: '',
    },
  });

  const onDuplicateCheck = async (ID) => {
    if (!checkValidID(ID)) {
      Alert.alert('알림', `아이디 형식을 확인해 주세요.`, [
        { text: '네!', style: 'cancel' },
      ]);
      return;
    }
    try {
      const dupCheckRes = await CheckDuplicateID(ID);
      if (dupCheckRes) {
        Alert.alert('알림', `사용 가능한 ID입니다.`, [
          { text: '사용하기', style: 'cancel' },
        ]);
        setIsUniqueID(true);
      }
    } catch (error) {
      if (error.response.status === 409) {
        Alert.alert('알림', `중복된 ID입니다.\n다른 아이디를 사용해 주세요.`, [
          { text: '네!', style: 'cancel' },
        ]);
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
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (!isUniqueID) {
      Alert.alert('알림', `아이디 중복확인을 진행해 주세요.`, [
        { text: '네!', style: 'cancel' },
      ]);
      return;
    }
    if (!checkValidID(data.ID)) {
      Alert.alert('알림', `아이디 형식을 확인해 주세요.`, [
        { text: '네!', style: 'cancel' },
      ]);
      return;
    }
    if (!checkValidPW(data.PW)) {
      Alert.alert('알림', `비밀번호 형식을 확인해 주세요.`, [
        { text: '네!', style: 'cancel' },
      ]);
      return;
    }
    if (!data.nickname) {
      Alert.alert('알림', `닉네임을 입력해 주세요.`, [
        { text: '네!', style: 'cancel' },
      ]);
      return;
    }
    try {
      const sendingData = {
        login_id: data.ID,
        password: data.PW,
        nickname: data.nickname,
        timestamp: moment().unix(),
      };
      const logInRes = await CMSignUp(sendingData);
      if (logInRes.data) {
        Alert.alert('알림', `회원가입에 성공했습니다!\n로그인해 주세요.`, [
          { text: '네!', style: 'cancel' },
        ]);
      }
      navigation.navigate('LogIn');
    } catch (error) {
      if (error.response) {
        Alert.alert('알림', `회원가입에 실패했습니다.\n다시 시도해 주세요.`, [
          {
            text: '네!',
            style: 'cancel',
          },
        ]);
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
            <IDinputWrapper>
              <IDinput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />

              <DupCheckID
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                onPress={() => onDuplicateCheck(value)}
              >
                <DupCheckIDText>중복확인</DupCheckIDText>
              </DupCheckID>
            </IDinputWrapper>
            {!checkValidID(value) ? (
              <GuideText>
                4~20자의 영문 소문자, 숫자와 특수문자(_),(-)만 사용 가능합니다.
              </GuideText>
            ) : (
              <GuideText>올바른 아이디 형식입니다.</GuideText>
            )}
          </Container>
        )}
        name="ID"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Container>
            <InputLabel>비밀번호</InputLabel>
            <PWinput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
            {!checkValidPW(value) ? (
              <GuideText>
                숫자와 특수문자를 포함한 6자 이상이어야 합니다.
              </GuideText>
            ) : (
              <GuideText>올바른 비밀번호 형식입니다.</GuideText>
            )}
          </Container>
        )}
        name="PW"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Container>
            <InputLabel>닉네임</InputLabel>
            <PWinput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          </Container>
        )}
        name="nickname"
      />
      <SubmitBtnContainer onPress={handleSubmit(onSubmit)}>
        <SubmitBtnText>챗마인더 가입하기</SubmitBtnText>
      </SubmitBtnContainer>
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
const DupCheckID = styled.TouchableOpacity`
  border-radius: 20px;
  background: ${palette.main};
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 20px;
`;
const DupCheckIDText = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  font-size: 12px;
  color: white;
`;

const GuideText = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  font-size: 12px;
  color: #717683;
`;

const InputLabel = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  font-size: 16px;
`;
const IDinputWrapper = styled.View`
  margin: 4px 0 4px 0;
  width: 100%;
  flex-direction: row;
  height: 50px;
  background: ${palette.white};
  border: 1px solid #d8d9df;
  align-self: center;
`;

const IDinput = styled.TextInput`
  width: 82.5%;
  padding: 0 10px 0 10px;
`;
const PWinput = styled.TextInput`
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
export default SignUp;
