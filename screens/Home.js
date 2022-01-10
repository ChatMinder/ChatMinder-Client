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
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextR from '../shared/components/TextR';

const Home = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const tagData = useSelector((state) => state.tagData);

  const [onSearchChange, renderState] = useSearch();
  const onDeletePress = () => {
    alert('delete');
    //API 메모 삭제 로직 넣기
  };

  const [isSearchToggled, setIsSearchToggled] = useState(false);

  useEffect(() => {
    isSearchToggled
      ? navigation.setOptions({
          headerStyle: { backgroundColor: '#ECECEF' },
          headerLeft: () => null,
          headerRight: () => null,
          headerTitle: () => (
            <HeaderContainer>
              <SearchIcon source={require('../shared/assets/search.png')} />
              <SearchInput
                onChangeText={onSearchChange}
                placeholder="내용, 태그 검색"
              />
              <CancelBtn
                onPress={() => {
                  onSearchChange('');
                  setIsSearchToggled(!isSearchToggled);
                }}
              >
                <TextR>취소</TextR>
              </CancelBtn>
            </HeaderContainer>
          ),
        })
      : navigation.setOptions({
          headerStyle: { backgroundColor: '#ECECEF' },
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <HomeIcon source={require('../shared/assets/Drawer.png')} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <ProfileWrapper onPress={() => navigation.navigate('MyPage')}>
              <Profile source={require('../shared/assets/LogoHome.png')} />
            </ProfileWrapper>
          ),
          headerTitleAlign: 'center',
          headerRight: () => (
            <SearchBtnContainer
              onPress={() => setIsSearchToggled(!isSearchToggled)}
            >
              <HomeIcon source={require('../shared/assets/Search_Home.png')} />
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
              <MemoItemWrapper key={memo.id}>
                {index === 0 ? (
                  <MemoDate memoTime={memo.timestamp} />
                ) : (
                  moment
                    .unix(renderState[index - 1].timestamp)
                    .format('YYYY-MM-DD') !==
                    moment.unix(memo.timestamp).format('YYYY-MM-DD') && (
                    <MemoDate memoTime={memo.timestamp} />
                  )
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

const HeaderContainer = styled.View`
  flex-direction: row;
  width: 328px;
  height: 32px;
  border-radius: 15.5px;
  background: #fcfcfc;
`;
const SearchIcon = styled.Image`
  align-self: center;
  margin: 0 12px 0 12px;
  width: 14.5px;
  height: 14.5px;
`;
const SearchInput = styled.TextInput`
  height: 100%;
  width: 75%;
`;
const CancelBtn = styled.TouchableOpacity`
  align-self: center;
  position: absolute;
  right: 10px;
`;
const SearchBtnContainer = styled.TouchableOpacity``;
const HomeIcon = styled.Image`
  margin: 16px;
`;

const ProfileWrapper = styled.TouchableOpacity``;
const Profile = styled.Image``;

const MemoContainer = styled.ScrollView`
  background: #ececef;
`;

const MemoItemWrapper = styled.View``;

const InputContainer = styled.View``;

const Wrapper = styled.View`
  height: 100%;
`;
``;

export default Home;
