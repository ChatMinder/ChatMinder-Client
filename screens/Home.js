import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Search from '../components/Search';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import MemoInputForm from '../components/MemoInputForm';
import MemoItem from '../components/MemoItem';
import MemoDate from '../components/MemoDate';

const Home = ({ navigation: { setOptions } }) => {
  const memoObj = useSelector((state) => state);
  const onDeletePress = () => {
    alert('delete');
    //API 메모 삭제 로직 넣기
  };

  useEffect(() => {
    setOptions({
      headerRight: () => <Search />,
    });
  });

  return (
    <Wrapper>
      <MemoContainer>
        {memoObj.map(
          (memo) =>
            memo.memoID && (
              <MemoItemWrapper key={memo.memoID}>
                <MemoDate memoID={memo.memoID} />
                <MemoItem memo={memo} />
              </MemoItemWrapper>
            )
        )}
      </MemoContainer>
      <InputContainer>
        <MemoInputForm />
      </InputContainer>
    </Wrapper>
  );
};

const MemoContainer = styled.ScrollView`
  border: 3px solid gold;
`;

const MemoItemWrapper = styled.View``;

const InputContainer = styled.View``;

const Wrapper = styled.View`
  height: 100%;
`;

export default Home;
