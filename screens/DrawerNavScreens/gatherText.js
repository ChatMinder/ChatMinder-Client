import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import styled from 'styled-components/native';
import Search from '../../shared/components/Search';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';
import axios from 'axios';
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
  SearchIcon,
  BookmarkBox,
} from '../../shared/styles/HeaderStyle';

import {
  Container,
  TextBox,
  DateItem,
} from '../../shared/styles/TextContainerStyle';
import TextB from '../../shared/components/TextB';
import TextR from '../../shared/components/TextR';
import { TextSize } from '../../shared/styles/FontStyle';
import HeaderButton from '../../shared/components/HeaderButton';

const goBack = require('../../shared/assets/GoBack.png');
const search = require('../../shared/assets/search.png');

const gatherText = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  //console.log('memoData: ', memoData);
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [onSearchChange, renderState] = useSearch();
  const [texts, setTexts] = useState([]);

  const [choice, setChoice] = useState('all');

  const handleTexts = async () => {
    try {
      const getTextRes = await GetTexts(token);
      setTexts(getTextRes.data);
      console.log('getTextRes 성공: ', getTextRes.data);
    } catch (error) {
      console.log(`getTextRes 실패: ${error}`);
    }
  };

  useEffect(() => {
    handleTexts();
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
              <HeaderIcon source={goBack} />
            </TouchableOpacity>
            <TextB>
              <TextSize fontSize="18">텍스트 모아보기</TextSize>
            </TextB>
            <NoVisibleBox />
          </TitleBox>
          <InputBox>
            <SearchIcon source={search} />
            <SearchInput
              onChangeText={onSearchChange}
              placeholder="내용, 태그 검색"
            />
          </InputBox>
          <BookmarkBox>
            <HeaderButton type="bookmark" setChoice={setChoice} />
          </BookmarkBox>
        </HeaderContainer>
      ),
    });
  }, []);

  const handleTab = {
    all: <Text>all</Text>,
    bookmark: <Text>bookmark</Text>,
  };

  return (
    <Scroll>
      <Container>
        {texts.map(
          (memo, index) =>
            memo.timestamp && (
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
                  memo={memo}
                  navigation={navigation}
                  destination="detailText"
                  history="gatherText"
                />
              </TextBox>
            )
        )}
      </Container>
    </Scroll>
  );
};

export default gatherText;

const Scroll = styled.ScrollView`
  height: 90%;
`;
