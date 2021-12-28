import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';

const MemoDate = ({ memoID }) => {
  const date = moment.unix(memoID).format('ll');
  return (
    <DateWrapper>
      <Text>{date}</Text>
    </DateWrapper>
  );
};

const DateWrapper = styled.View`
  align-items: center;
  border: 1px solid lime;
`;

export default MemoDate;
