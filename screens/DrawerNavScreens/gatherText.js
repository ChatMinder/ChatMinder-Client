import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import palette from '../../palette/palette';
import Search from '../../components/Search';
// import InputBox from '../../components/InputBox';

const InputItem = styled.TextInput`
  background-color: ${palette.gray};
`;

const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const gatherText = () => {
  return (
    <View>
      <Text>텍스트 모아보기</Text>
      <ButtonBox>
        <InputItem placeholder="검색어를 입력해주세요" />
        <Search />
      </ButtonBox>
    </View>
  );
};

export default gatherText;
