import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';
import palette from '../../palette/palette';
import Search from '../../components/Search';
// import InputBox from '../../components/InputBox';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const InputItem = styled.TextInput`
  background-color: ${palette.gray};
`;

const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CommonCenter = css`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.View`
  ${CommonCenter}
`;

const TextItem = styled.View`
  ${CommonCenter}
  border: black 1px solid;
  width: 80%;
  margin-bottom: 3%;
`;

const gatherText = () => {
  const value = useSelector((state) => state);
  console.log('value: ', value);

  const [memos, setMemos] = useState([]);

  // useEffect(() => {
  //   setMemos(value.slice(1));
  //   console.log(memos);
  // }, [memos]);

  return (
    <View>
      <Text>텍스트 모아보기</Text>
      <ButtonBox>
        <InputItem placeholder="검색어를 입력해주세요" />
        <Search />
      </ButtonBox>
      <TextBox>
        {value.slice(1).map((memo) => (
          <TextItem>
            <Text key={memo.memoID}>{memo.memoText}</Text>
          </TextItem>
        ))}
      </TextBox>
    </View>
  );
};

export default gatherText;
