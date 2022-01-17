import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, RefreshControl, StatusBar } from 'react-native';

import moment from 'moment';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

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
import palette from '../shared/palette';

const Home = ({ navigation }) => {
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  const [onSearchChange, renderState] = useSearch('Main');
  const [isSearchToggled, setIsSearchToggled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isSearchToggled
      ? navigation.setOptions({
          headerStyle: { backgroundColor: palette.mainHeaderGray },
          headerLeft: () => null,
          headerRight: () => null,
          headerTitle: () => (
            <HeaderContainer>
              <SearchIcon style={{ margin: 12 }} />
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
          headerStyle: {
            backgroundColor: palette.mainHeaderGray,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <DrawerIcon style={{ margin: 16 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <ProfileWrapper>
              <LogoHome />
            </ProfileWrapper>
          ),
          headerTitleAlign: 'center',
          headerRight: () => (
            <SearchBtnContainer
              onPress={() => setIsSearchToggled(!isSearchToggled)}
            >
              <SearchIcon style={{ margin: 16 }} />
            </SearchBtnContainer>
          ),
        });
  }, [isSearchToggled]);

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
      if (error == 'Error: Network Error') {
        Alert.alert(
          '알림',
          `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
          [
            {
              text: '네!',
              style: 'cancel',
            },
          ]
        );
      }
    }
  };

  return (
    <Wrapper>
      <StatusBar
        backgroundColor={palette.mainHeaderGray}
        barStyle="dark-content"
      />
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
      {!isSearchToggled && (
        <InputContainer>
          <MemoInputForm />
        </InputContainer>
      )}
    </Wrapper>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${SCREEN_WIDTH * 0.9}px;
  height: 36px;
  border-radius: 15.5px;
  background: #fcfcfc;
`;

const SearchInput = styled.TextInput`
  height: 100%;
  width: 75%;
`;
const CancelBtn = styled.TouchableOpacity`
  padding: 10px;
  align-self: center;
  position: absolute;
  right: 0;
`;
const SearchBtnContainer = styled.TouchableOpacity``;

const ProfileWrapper = styled.View``;

const MemoContainer = styled.ScrollView`
  /* background: #ececef; */
`;

const MemoItemWrapper = styled.View``;

const InputContainer = styled.View`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const Wrapper = styled.View`
  height: 100%;
  background: ${palette.mainHeaderGray};
`;

export default Home;
