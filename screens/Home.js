import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Search from '../shared/components/Search';
import MemoInputForm from '../shared/components/MemoInputForm';
import MemoItem from '../shared/components/MemoItem';
import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation: { setOptions } }) => {
  const memoObj = useSelector((state) => state);
  const [onSearchChange, renderState] = useSearch(memoObj);
  const onDeletePress = () => {
    alert('delete');
    //API 메모 삭제 로직 넣기
  };

  const [isSearchToggled, setIsSearchToggled] = useState(false);

  useEffect(() => {
    isSearchToggled
      ? setOptions({
          headerTitle: () => (
            <Container>
              <Ionicons name="search" color="black" size={20} />
              <SearchInput
                onChangeText={onSearchChange}
                placeholder="내용, 태그 검색"
              />
            </Container>
          ),
          headerRight: () => (
            <Container onPress={() => setIsSearchToggled(!isSearchToggled)}>
              <Text>취소</Text>
            </Container>
          ),
        })
      : setOptions({
          headerTitle: () => <Text>Home</Text>,
          headerRight: () => (
            <Container onPress={() => setIsSearchToggled(!isSearchToggled)}>
              <Ionicons name="search" color="black" size={20} />
            </Container>
          ),
        });
  }, [isSearchToggled]);

  return (
    <Wrapper>
      <MemoContainer>
        {renderState.map(
          (memo, index) =>
            memo.memoID && (
              <MemoItemWrapper key={memo.memoID}>
                {moment
                  .unix(renderState[index - 1].memoID)
                  .format('YYYY-MM-DD') !==
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

const Container = styled.TouchableOpacity`
  margin: 15px;
  flex-direction: row;
`;
const SearchInput = styled.TextInput`
  border: 1px solid red;
  width: 200px;
`;

const MemoContainer = styled.ScrollView`
  border: 3px solid gold;
`;

const MemoItemWrapper = styled.View``;

const InputContainer = styled.View``;

const Wrapper = styled.View`
  height: 100%;
`;

export default Home;
