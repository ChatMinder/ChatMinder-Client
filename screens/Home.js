import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, Image, RefreshControl } from 'react-native';

import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import MemoInputForm from '../shared/components/MemoInputForm';
import MemoItem from '../shared/components/MemoItem';
import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextR from '../shared/components/TextR';
import { GetMemo, GetTags } from '../shared/API';
import { setMemos } from '../shared/reducers/memo';
import { setTags } from '../shared/reducers/tag';
import DrawerIcon from '../shared/assets/Drawer.svg';
import SearchIcon from '../shared/assets/search.svg';
import LogoHome from '../shared/assets/LogoHome.svg';

const Home = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const tagData = useSelector((state) => state.tagData);
  const token = useSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();

  const [onSearchChange, renderState] = useSearch();

  const [isSearchToggled, setIsSearchToggled] = useState(false);

  useEffect(() => {
    isSearchToggled
      ? navigation.setOptions({
          headerStyle: { backgroundColor: '#ECECEF' },
          headerLeft: () => null,
          headerRight: () => null,
          headerTitle: () => (
            <HeaderContainer>
              <SearchIcon />
              <SearchInput
                onChangeText={onSearchChange}
                placeholder="내용, 태그 검색"
                autoFocus={true}
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
              <DrawerIcon />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <ProfileWrapper onPress={() => navigation.navigate('MyPage')}>
              <LogoHome />
            </ProfileWrapper>
          ),
          headerTitleAlign: 'center',
          headerRight: () => (
            <SearchBtnContainer
              onPress={() => setIsSearchToggled(!isSearchToggled)}
            >
              <SearchIcon />
            </SearchBtnContainer>
          ),
        });
  }, [isSearchToggled]);
  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(false);
  const onRefresh = async () => {
    setLoading(true);
    try {
      const getMemoRes = await GetMemo(token);
      dispatch(setMemos(getMemoRes.data));
      const getTagRes = await GetTags(token);
      dispatch(setTags(getTagRes.data));
      setLoading(false);
    } catch (error) {
      console.log(`새로고침 메모 가져오기 실패: ${error}`);
    }
  };
  return (
    <Wrapper>
      <MemoContainer
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
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
const SearchIconImg = styled.Image`
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
