import React, { useEffect, useState } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GetLinks } from '../../shared/API';
import RNUrlPreview from 'react-native-url-preview';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';
import TextContainer from '../../shared/components/TextContainer';
import styled, { css } from 'styled-components/native';
import palette from '../../shared/palette';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import TextB from '../../shared/components/TextB';
import TextR from '../../shared/components/TextR';
import { TextSize } from '../../shared/styles/FontStyle';
import HeaderButton from '../../shared/components/HeaderButton';

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
  TagBox,
  Container,
  TextBox,
  DateItem,
  BoxContainer,
  BookmarkItem,
  BookmarkBox2,
  TextItem,
} from '../../shared/styles/TextContainerStyle';

const goBack = require('../../shared/assets/GoBack.png');
const search = require('../../shared/assets/search.png');
const empty = require('../../shared/assets/emptyBookmark.png');
const fulled = require('../../shared/assets/fulledBookmark.png');

const gatherLink = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  //console.log('memoData: ', memoData);
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [links, setLinks] = useState([]);
  const [onSearchChange, renderState] = useSearch();
  const [choice, setChoice] = useState('all');

  useEffect(() => {
    getLinks();
    //console.log(renderState);
    // console.log(
    //   'url',
    //   <RNUrlPreview text={'https://naver.com, https://naver.com'} />
    // );
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
              <TextSize fontSize="18">링크 모아보기</TextSize>
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

  const getLinks = async () => {
    try {
      const getLinksRes = await axios.get(
        'https://api.chatminder.app/memos/links',
        {
          headers: {
            Authorization:
              'Bearer ' +
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
          },
        }
      );
      //const getLinksRes = await GetLinks(token);
      console.log('getLinks 성공: ', getLinksRes.data);
      setLinks(getLinksRes.data);
    } catch (error) {
      console.log('getLinks 실패', error);
    }
  };

  return (
    <Scroll>
      <Container>
        {links.map((memo, index) => (
          <TextBox key={memo.id}>
            <DateItem>
              {index === 0 ? (
                <MemoDate memoTime={memo.timestamp} />
              ) : (
                moment.unix(links[index - 1].timestamp).format('YYYY-MM-DD') !==
                  moment.unix(memo.timestamp).format('YYYY-MM-DD') && (
                  <MemoDate memoTime={memo.timestamp} />
                )
              )}
            </DateItem>
            <TextContainer memo={memo} navigation={navigation} history="태그" />
          </TextBox>
        ))}
      </Container>
    </Scroll>
  );
};

export default gatherLink;

const Scroll = styled.ScrollView`
  height: 90%;
`;
