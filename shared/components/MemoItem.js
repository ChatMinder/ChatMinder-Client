import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const MemoItem = ({ memo }) => {
  return (
    <Wrapper>
      <MemoWrapper>
        <MemoContainer>
          <Text>{memo.memoText}</Text>
        </MemoContainer>
        <MemoFooter>
          <Text>{memo.categoryName}</Text>
        </MemoFooter>
      </MemoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MemoWrapper = styled.View`
  /* justify-content: center; */
  align-items: center;
  width: 328px;
  margin: 16px;
  border: 1px dashed gray;
`;

const MemoContainer = styled.TextInput`
  background: skyblue;
`;

const MemoFooter = styled.View``;

export default MemoItem;
