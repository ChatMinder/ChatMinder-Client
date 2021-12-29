import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Search from '../shared/components/Search';
import MemoInputForm from '../shared/components/MemoInputForm';
import MemoItem from '../shared/components/MemoItem';
import MemoDate from '../shared/components/MemoDate';

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
          (memo, index) =>
            memo.memoID && (
              <MemoItemWrapper key={memo.memoID}>
                {moment.unix(memoObj[index - 1].memoID).format('YYYY-MM-DD') !==
                  moment.unix(memo.memoID).format('YYYY-MM-DD') && (
                  <MemoDate memoID={memo.memoID} />
                )}
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
