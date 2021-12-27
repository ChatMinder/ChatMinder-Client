import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const MemoItem = ({ memo }) => {
  return (
    <MemoWrapper>
      <Text>{memo.categoryName}</Text>
      <MemoContainer>
        <Text>{memo.memoText}</Text>
      </MemoContainer>
    </MemoWrapper>
  );
};

const MemoWrapper = styled.View`
  margin: 16px;
  border: 1px dashed gray;
`;

const MemoContainer = styled.TextInput`
  background: skyblue;
`;

export default MemoItem;
