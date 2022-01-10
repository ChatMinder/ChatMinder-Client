import React, { useEffect, useState } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
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
      const response = await axios.get(
        'https://api.chatminder.app/memos/links',
        {
          headers: {
            Authorization:
              'Bearer ' +
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NTE3ODkzLCJqdGkiOiI3NDA3OGFmNjRmMGI0MzhiYjI4NGMxMmNkNGNmYmM3MiIsInVzZXJfaWQiOjcsImtha2FvX2lkIjoiMTIzNDU2Iiwia2FrYW9fZW1haWwiOiJ0ZXMzM3QyMTIzQG5hdmVyLmNvbSJ9.MhX2wqeBrcJvrmccInomG3Z-mu1xmgaBMK464IhJ_1s',
          },
        }
      );
      console.log('response >>', response.data);
      setLinks(response.data);
    } catch (error) {
      console.log('Error >>', error);
    }
  };

  return (
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
          <BoxContainer>
            <RNUrlPreview text={`${memo.memo_text}, ${memo.url}`} />
            <TextR>
              <TextSize color={palette.gray2}>{memo.url}</TextSize>
            </TextR>
            <TextR>{memo.memo_text}</TextR>
            <BookmarkBox2>
              {memo.tag_name ? (
                <TagBox backgroundColor={memo.tag_color}>
                  <TextR>
                    <TextItem>{memo.tag_name}</TextItem>
                  </TextR>
                </TagBox>
              ) : (
                <View />
              )}

              <TouchableOpacity
                onPress={() => {
                  console.log('북마크');
                }}
              >
                {memo.is_marked ? (
                  <BookmarkItem source={fulled} />
                ) : (
                  <BookmarkItem source={empty} />
                )}
              </TouchableOpacity>
            </BookmarkBox2>
          </BoxContainer>
        </TextBox>
      ))}
    </Container>
  );
};

export default gatherLink;
