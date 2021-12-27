import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Search from '../components/Search';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import MemoInputForm from '../components/MemoInputForm';

const Home = ({ navigation: { setOptions } }) => {
  const memoObj = useSelector((state) => state);
  console.log(memoObj);

  useEffect(() => {
    setOptions({
      headerRight: () => <Search />,
    });
  });

  return (
    <View>
      <Text>Home</Text>
      {memoObj.map(
        (memo) =>
          memo.memoText && (
            <MemoWrapper key={memo.memoID}>
              <Text>{memo.categoryName}</Text>
              <MemoContainer>
                <Text>{memo.memoText}</Text>
              </MemoContainer>
            </MemoWrapper>
          )
      )}

      <MemoInputForm />
    </View>
  );
};

const MemoWrapper = styled.View`
  margin: 16px;
  border: 1px dashed gray;
`;

const MemoContainer = styled.View`
  background: skyblue;
`;

export default Home;
