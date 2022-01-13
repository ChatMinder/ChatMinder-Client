import React, { useEffect, useState } from 'react';
import { TouchableOpacity, RefreshControl } from 'react-native';

import { GetLinks } from '../../shared/API';
import RNUrlPreview from 'react-native-url-preview';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';
import TextContainer from '../../shared/components/TextContainer';
import styled from 'styled-components/native';
import palette from '../../shared/palette';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import TextB from '../../shared/components/TextB';
import { TextSize } from '../../shared/styles/FontStyle';
import HeaderButton from '../../shared/components/HeaderButton';
import EmptyBookmark from '../../shared/assets/emptyBookmark.svg';
import FulledBookmark from '../../shared/assets/fulledBookmark.svg';

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

import GoBack from '../../shared/assets/GoBack.svg';
import SearchIcon from '../../shared/assets/search.svg';

const gatherLink = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  //console.log('memoData: ', memoData);
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [links, setLinks] = useState([]);
  const [onSearchChange, renderState] = useSearch();
  const [choice, setChoice] = useState('all');
  const [clickedState, setClickedState] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(async () => {
    await getLinks();
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
              <TextSize fontSize="18">링크 모아보기</TextSize>
            </TextB>
            <NoVisibleBox />
          </TitleBox>
          <InputBox>
            <SearchIcon style={{ marginHorizontal: 8 }} />
            <SearchInput onChangeText={onSearchChange} />
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

  const getLinks = async () => {
    try {
      const getLinksRes = await GetLinks(token);
      console.log('getLinks 성공: ', getLinksRes.data);
      setLinks(getLinksRes.data);
      setRefreshing(false);
    } catch (error) {
      console.log('getLinks 실패', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getLinks();
  };

  return (
    <Scroll
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {clickedState ? (
        <Container>
          {links.map((memo, index) => (
            <TextBox key={memo.id}>
              <DateItem>
                {index === 0 ? (
                  <MemoDate memoTime={memo.timestamp} />
                ) : (
                  moment
                    .unix(links[index - 1].timestamp)
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
                history="gatherLink"
              />
            </TextBox>
          ))}
        </Container>
      ) : (
        <Container>
          {links
            .filter((element) => element.is_marked === true)
            .map((memo, index) => (
              <TextBox key={memo.id}>
                <DateItem>
                  {index === 0 ? (
                    <MemoDate memoTime={memo.timestamp} />
                  ) : (
                    moment
                      .unix(links[index - 1].timestamp)
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
                  history="gatherLink"
                />
              </TextBox>
            ))}
        </Container>
      )}
    </Scroll>
  );
};

export default gatherLink;

const Scroll = styled.ScrollView`
  height: 90%;
`;
