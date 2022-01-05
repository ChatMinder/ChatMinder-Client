import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';

const MemoDate = ({ memoTime }) => {
  const date = moment.unix(memoTime).format(`YYYY년 MM월 DD일 dddd`);
  return (
    <DateWrapper>
      <DateText>{date}</DateText>
    </DateWrapper>
  );
};

const DateWrapper = styled.View`
  width: 124px;
  height: 20px;
  margin: 6px;
  justify-content: center;
  align-self: center;
  background: #fcfcfc;
  border-radius: 10.5px;
`;
const DateText = styled.Text`
  align-self: center;
  font-size: 10px;
`;

export default MemoDate;
