import React, { useState, useEffect } from 'react';
import { TouchableOpacity, RefreshControl } from 'react-native';
import styled from 'styled-components/native';

import useSearchGather from '../../shared/hooks/useSearchGather';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';

import { GetTexts } from '../../shared/API';

import TextContainer from '../../shared/components/TextContainer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  SearchInput,
  TitleBox,
  HeaderIcon,
  HeaderContainer,
  NoVisibleBox,
  InputBox,
  BookmarkBox,
} from '../../shared/styles/HeaderStyle';

import {
  Container,
  TextBox,
  DateItem,
} from '../../shared/styles/TextContainerStyle';
import TextB from '../../shared/components/TextB';
import { TextSize } from '../../shared/styles/FontStyle';
import HeaderButton from '../../shared/components/HeaderButton';

import GoBack from '../../shared/assets/GoBack.svg';
import SearchIcon from '../../shared/assets/search.svg';

const gatherText = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  //console.log('memoData: ', memoData);
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [texts, setTexts] = useState([]);
  const [onSearchChange, renderState] = useSearchGather(texts);
  const [gatherMarked, setGatherMarked] = useState(false);
  const [choice, setChoice] = useState('all');
  const [clickedState, setClickedState] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const handleTexts = async () => {
    try {
      const getTextRes = await GetTexts(token);
      setTexts(getTextRes.data);
      console.log('getTextRes 성공: ', getTextRes.data);
      setRefreshing(false);
    } catch (error) {
      console.log(`getTextRes 실패: ${error}`);
    }
  };

  useEffect(async () => {
    await handleTexts();
    navigation.setOptions({
      headerStyle: {
        height: 120,
      },
      headerLeft: () => null,
      headerRight: () => null,
      headerTitle: () => (
        <HeaderContainer>
          <TitleBox>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <GoBack style={{ marginRight: 12, marginVertical: 16 }} />
            </TouchableOpacity>
            <TextB>
              <TextSize fontSize="18">텍스트 모아보기</TextSize>
            </TextB>
            <NoVisibleBox />
          </TitleBox>
          <InputBox>
            <SearchIcon style={{ marginHorizontal: 8 }} />
            <SearchInput
              onChangeText={onSearchChange}
              placeholder="내용, 태그 검색"
            />
          </InputBox>
          <BookmarkBox>
            <HeaderButton
              type="bookmark"
              setChoice={setChoice}
              setClickedState={setClickedState}
            />
          </BookmarkBox>
        </HeaderContainer>
      ),
    });
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleTexts();
  };

  return (
    <Scroll
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {clickedState ? (
        <Container>
          {renderState
            // .filter(
            //   (elemnet) => (elemnet.url === null) & (elemnet.images.length === 0)
            // )
            .map((memo, index) => (
              <TextBox key={memo.id}>
                <DateItem>
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
                </DateItem>
                <TextContainer
                  key={memo.id}
                  memo={memo}
                  navigation={navigation}
                  destination="detailText"
                  history="gatherText"
                />
              </TextBox>
            ))}
        </Container>
      ) : (
        <Container>
          {renderState
            .filter((element) => element.is_marked === true)
            .map((memo, index) => (
              <TextBox key={memo.id}>
                <DateItem>
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
                </DateItem>
                <TextContainer
                  key={memo.id}
                  memo={memo}
                  navigation={navigation}
                  destination="detailText"
                  history="gatherText"
                />
              </TextBox>
            ))}
        </Container>
      )}
    </Scroll>
  );
};

export default gatherText;

const Scroll = styled.ScrollView`
  height: 90%;
`;
