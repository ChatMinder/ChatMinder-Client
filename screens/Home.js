import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';

import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Search from '../shared/components/Search';
import MemoInputForm from '../shared/components/MemoInputForm';
import MemoItem from '../shared/components/MemoItem';
import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import { Ionicons } from '@expo/vector-icons';
import { checkIncludeURL } from '../shared/checkIncludeURL';

const Home = ({ navigation }) => {
  const memoObj = useSelector((state) => state);
  const [onSearchChange, renderState] = useSearch(memoObj);
  const onDeletePress = () => {
    alert('delete');
    //API 메모 삭제 로직 넣기
  };

  const [isSearchToggled, setIsSearchToggled] = useState(false);

  useEffect(() => {
    isSearchToggled
      ? navigation.setOptions({
          headerStyle: { backgroundColor: '#E5E5E5' },

          headerTitle: () => (
            <HeaderContainer>
              <Ionicons name="search" color="black" size={20} />
              <SearchInput
                onChangeText={onSearchChange}
                placeholder="내용, 태그 검색"
              />
            </HeaderContainer>
          ),
          headerRight: () => (
            <HeaderContainer
              onPress={() => setIsSearchToggled(!isSearchToggled)}
            >
              <Text>취소</Text>
            </HeaderContainer>
          ),
        })
      : navigation.setOptions({
          headerStyle: { backgroundColor: '#E5E5E5' },

          headerTitle: () => (
            <ProfileWrapper onPress={() => navigation.navigate('MyPage')}>
              <Profile
                source={require('../shared/assets/DefaultProfile.png')}
              />
            </ProfileWrapper>
          ),
          headerTitleAlign: 'center',
          headerRight: () => (
            <SearchBtnContainer
              onPress={() => setIsSearchToggled(!isSearchToggled)}
            >
              <SearchBtn source={require('../shared/assets/search.png')} />
            </SearchBtnContainer>
          ),
        });
  }, [isSearchToggled]);
  return (
    <Wrapper>
      {/* <Image
        style={{ width: '100%', height: '50%' }}
        source={{ uri: 'http://d5b0lcexvt9vq.cloudfront.net/chatminder.png' }}
      /> */}
      <MemoContainer>
        {renderState.map(
          (memo, index) =>
            memo.timestamp && (
              <MemoItemWrapper key={memo.memoID}>
                {moment
                  .unix(renderState[index - 1].timestamp)
                  .format('YYYY-MM-DD') !==
                  moment.unix(memo.timestamp).format('YYYY-MM-DD') && (
                  <MemoDate memoTime={memo.timestamp} />
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

const URLCheck = styled.Button``;

const HeaderContainer = styled.TouchableOpacity`
  /* margin: 15px;
  flex-direction: row; */
`;
const SearchBtnContainer = styled.TouchableOpacity``;
const SearchBtn = styled.Image`
  margin: 17.5px;
`;

const ProfileWrapper = styled.TouchableOpacity``;
const Profile = styled.Image``;

const SearchInput = styled.TextInput`
  border: 1px solid red;
  width: 200px;
`;

const MemoContainer = styled.ScrollView`
  background: #e5e5e5;
`;

const MemoItemWrapper = styled.View``;

const InputContainer = styled.View``;

const Wrapper = styled.View`
  height: 100%;
`;
``;

export default Home;
